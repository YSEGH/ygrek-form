<?php

/**
 * VF style
 *
 * This is the file for style files.
 *
 * @package YF
 * @since 	0.0.1
 */

if (!defined('ABSPATH')) exit;

if (!class_exists('YF_style')) :

    class YF_style
    {
        function __construct()
        {
            add_action('admin_enqueue_scripts', [$this, 'enqueue_style']);
        }
        /* Enqueue style files */
        function enqueue_style()
        {
            wp_enqueue_style('YF_style', YF_URL . '/assets/css/style.css', null, '1');
        }
    }

endif;
return new YF_style;
