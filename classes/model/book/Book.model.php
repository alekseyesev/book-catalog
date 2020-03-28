<?php

namespace BusinessModel;

require get_template_directory() . '/classes/model/AbstractData.model.php';
require get_template_directory() . '/classes/controller/book/BookWithEventLoop.controller.php';

class Book extends AbstractData
{
    public function __construct()
    {
        $this->entry_point = 'books';
        $this->post_type = 'book';
        add_action('init', array( $this, 'register_custom_type' ));
        add_action('rest_api_init', function () {
            $controller = new \BookWithEventLoopRESTController();
            $controller->register_routes();
        });
    }
    public function register_custom_type()
    {
        $labels = array(
            'name'               => __('Книги', TEXT_DOMAIN),
            'singular_name'      => __('Книга', TEXT_DOMAIN),
            'menu_name'          => __('Книги', TEXT_DOMAIN),
            'name_admin_bar'     => __('Новая книга', TEXT_DOMAIN),
            'add_new'            => __('Добавить книгу', TEXT_DOMAIN),
            'add_new_item'       => __('Добавить новую книгу', TEXT_DOMAIN),
            'new_item'           => __('Новая практика', TEXT_DOMAIN),
            'edit_item'          => __('Редактировать книгу', TEXT_DOMAIN),
            'view_item'          => __('Посмотреть книгу', TEXT_DOMAIN),
            'all_items'          => __('Список книг', TEXT_DOMAIN),
            'search_items'       => __('Искать книги', TEXT_DOMAIN),
            'parent_item_colon'  => __('Родительская категория', TEXT_DOMAIN),
            'not_found'          => __('Книга не найдена.', TEXT_DOMAIN),
            'not_found_in_trash' => __('В корзине не найдено ни одной книги.', TEXT_DOMAIN)
        );

        $args = array(
            'labels'                => $labels,
            'public'                => false,
            'show_ui'               => true,
            'query_var'             => $this->post_type,
            'rewrite'               => false,
            'taxonomies'            => array(),
            'capability_type'       => 'post',
            'has_archive'           => false,
            'hierarchical'          => false,
            'menu_position'         => 10,
            'supports'              => array( 'title', 'editor', 'excerpt', 'revisions' ),
            'show_in_rest'          => true,
            'rest_base'             => $this->entry_point,
            'rest_controller_class' => 'BookRESTController'
        );
    
        register_post_type($this->post_type, $args);
    }
}
