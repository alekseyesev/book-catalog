<?php

const TEXT_DOMAIN = 'teplitsa';

interface ITheme {
    public function setup();
    public function load_scripts_handler();
}

$theme = new class implements ITheme {
    public function __construct()
    {
        add_action('after_setup_theme', array($this, 'setup'));
        add_action('wp_enqueue_scripts', array($this, 'load_scripts_handler'));
    }
    public function setup()
    {
        add_theme_support('title-tag');

        add_theme_support('post-formats', array());

        add_filter('use_block_editor_for_post', '__return_false', 10);

    }
    public function load_scripts_handler()
    {

        // Disable Windows Live Writer

        remove_action('wp_head', 'wlwmanifest_link');
        remove_action('wp_head', 'rsd_link');

        // Disable metatag "generator"

        remove_action('wp_head', 'wp_generator');

        // Remove WordPress version

        add_filter('the_generator', '__return_false');
    }
};

/**
 * Business model
 */

require get_template_directory() . '/classes/model/book/Book.model.php';

use BusinessModel\Book;

new Book;
