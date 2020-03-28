<?php

require get_template_directory() . '/classes/EventLoop.class.php';
require get_template_directory() . '/classes/controller/book/Book.controller.php';

class BookWithEventLoopRESTController extends BookRESTController
{
    public function get_items($request)
    {
        new EventLoop(function () use ($request) {
            $items = parent::get_items($request);
            if (md5(serialize(parent::$buffer)) === md5(serialize($items))) {
                return null;
            }
            else {
                parent::$buffer = $items;
                return $items;
            }
        }, "getBooks", $this);
        
        die();
    }
}
