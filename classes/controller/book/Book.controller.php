<?php

class BookRESTController extends WP_REST_Controller
{
    protected $post_type;
    public static $buffer = array();
    public function __construct()
    {
        $this->namespace = 'library/v1';
        $this->rest_base = 'books';
        $this->post_type = 'book';
    }

    public function register_routes()
    {
        register_rest_route($this->namespace, "/{$this->rest_base}", array(
            'methods'             => 'POST',
            'callback'            => array( $this, 'post_item' ),
            'permission_callback' => array( $this, 'post_item_permissions_check' ),
        ));
        
        register_rest_route($this->namespace, "/{$this->rest_base}", array(
            array(
                'methods'  => 'GET',
                'callback' => array( $this, 'get_items' ),
            ),
            'schema' => array( $this, 'get_item_schema' ),
        ));

        register_rest_route($this->namespace, "/{$this->rest_base}/(?P<id>[\w]+)", array(
            array(
                'methods'  => 'GET',
                'callback' => array( $this, 'get_item' ),
            ),
            'schema' => array( $this, 'get_item_schema' )
        ));
    }
    public function post_item_permissions_check($request)
    {
        if (wp_verify_nonce($request->get_params()->_wpnonce, "wp_rest")) {
            return new WP_Error('rest_forbidden', esc_html__('У вас недостаточно прав для совершения данной операции.'), array( 'status' => $this->error_status_code() ));
        }

        return true;
    }

    public function post_item($request)
    {
        $params       = $request->get_params();
        $post_title   = $params['book_name'];
        $post_content = $params['book_description'];

        $book_data = array(
            'post_type'     => $this->post_type,
            'post_status'   => 'draft',
            'post_author'   => get_current_user_id(),
            'post_title'    => $post_title,
            'post_content'  => $post_content,
        );

        if ($book_id = wp_insert_post($book_data)) {
            return array( "ok" => true );
        } else {
            return array( "ok" => false );
        }
    }

    public function get_items($request)
    {
        $data = array();

        $items = get_posts(array(
            'post_type'     => $this->post_type,
            'post_status'   => 'publish',
            'numberposts'   => -1,
            'orderby'       => 'date',
            'order'         => 'DESC'
        ));

        if (empty($items)) {
            return $items;
        }

        foreach ($items as $item) {
            $response = $this->prepare_item_for_response($item, $request);
            $data[] = $this->prepare_response_for_collection($response);
        }

        return $data;
    }

    public function get_item($request)
    {
        $id = (int) $request['id'];
        $item = get_post($id);

        if (! $item) {
            return array();
        }

        return $this->prepare_item_for_response($item, $request);
    }

    public function prepare_item_for_response($item, $request)
    {
        $item_data = array();

        $schema = $this->get_item_schema();

        if (isset($schema['properties']['id'])) {
            $item_data['id'] = (int) $item->ID;
        }

        if (isset($schema['properties']['title'])) {
            $item_data['title'] = apply_filters('the_title', $item->post_title, $item);
        }

        if (isset($schema['properties']['content'])) {
            $item_data['content'] = apply_filters('the_content', $item->post_content, $item);
        }

        return $item_data;
    }

    public function prepare_response_for_collection($response)
    {
        if (! ($response instanceof WP_REST_Response)) {
            return $response;
        }

        $data = (array) $response->get_data();
        $server = rest_get_server();

        if (method_exists($server, 'get_compact_response_links')) {
            $links = call_user_func([ $server, 'get_compact_response_links' ], $response);
        } else {
            $links = call_user_func([ $server, 'get_response_links' ], $response);
        }

        if (! empty($links)) {
            $data['_links'] = $links;
        }

        return $data;
    }

    public function get_item_schema()
    {
        $schema = array(
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => __('Книга', TEXT_DOMAIN),
            'type'       => 'object',
            'properties' => array(
                'id' => array(
                    'description' => __('Уникальный идентификатор книги', TEXT_DOMAIN),
                    'type'        => 'integer',
                    'context'     => array('view', 'edit', 'embed'),
                    'readonly'    => true,
                ),
                'title' => array(
                    'description' => __('Заголовок книги', TEXT_DOMAIN),
                    'type'        => 'string',
                ),
                'content' => array(
                    'description' => __('Текст книги', TEXT_DOMAIN),
                    'type'        => 'string',
                )
            ),
        );

        return $schema;
    }

    public function error_status_code()
    {
        return is_user_logged_in() ? 403 : 401;
    }
}
