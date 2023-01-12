<?php

/**
 * VF scripts
 *
 * This is the file for scripts files.
 *
 * @package YF
 * @since 	0.0.1
 */

if (!defined('ABSPATH')) exit;

if (!class_exists('YF_scripts')) :

    class YF_scripts
    {
        function __construct()
        {
            add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
            add_action('admin_enqueue_scripts', [$this, 'admin_enqueue_scripts']);
        }

        /* Enqueue admin scripts files */
        function admin_enqueue_scripts()
        {
            wp_enqueue_script('YF_scripts', YF_URL . '/assets/js/bundle.js', array('jquery', 'wp-element'), time(), true);
        }

        /* Enqueue scripts files */
        function enqueue_scripts()
        {
            wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js');
            wp_enqueue_script('YF_form_submit', YF_URL . '/assets/js/form_submit.js', array('jquery'), time());
        }
    }

endif;
return new YF_scripts;
