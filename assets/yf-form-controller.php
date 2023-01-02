<?php

/**
 * VF form controller
 *
 * REST Form API
 *
 * @package YF
 * @since 	0.0.1
 */

if (!defined('ABSPATH')) exit;

if (!class_exists('YF_form_controller')) :
    class YF_form_controller
    {

        public function __construct()
        {
            global $wpdb;
            $this->table_prefix = $wpdb->prefix;
        }
        public function post()
        {
            global $wpdb;
            $results = $wpdb->prepare("INSERT INTO");
        }
        public function get()
        {
        }

        public function update()
        {
        }
        public function delete()
        {
        }

        public function to_html()
        {
        }
    }
endif;
return new YF_form_controller;
