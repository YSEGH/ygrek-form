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
            add_action('admin_enqueue_scripts', [$this, 'enqueue_scripts']);
        }

        /* Enqueue scripts/style files */
        function enqueue_scripts()
        {
            wp_enqueue_script('YF_scripts', YF_URL . '/assets/js/bundle.js', array('jquery', 'wp-element'), time(), true);
        }
    }

endif;
return new YF_scripts;
