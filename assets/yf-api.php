<?php

/**
 * VF API
 *
 * This is the file for API.
 *
 * @package YF
 * @since 	0.0.1
 */

if (!defined('ABSPATH')) exit;

if (!class_exists('YF_api')) :

    class YF_api
    {
        function __construct()
        {
            add_action('rest_api_init', [$this, 'register_route']);
        }

        function register_route()
        {
            register_rest_route(
                'yf-form',
                '/add',
                array(
                    'methods' => 'POST',
                    'callback' => array($this, 'add_form')
                )
            );
        }

        function add_form(WP_REST_Request $request)
        {
            try {
                return new WP_REST_Response('REST API', 200);
            } catch (Exception $e) {
                return $e->getMessage();
            }
        }
    }

endif;
return new YF_api;
