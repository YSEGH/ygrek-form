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
        public $form;
        function __construct()
        {
            $this->form = new YF_form_controller();
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
            register_rest_route(
                'yf-form',
                '/get',
                array(
                    'methods' => 'POST',
                    'callback' => array($this, 'get_form')
                )
            );
        }

        function add_form(WP_REST_Request $request)
        {
            $form = [
                'form_title' => $request['form_title'],
                'form_id' => $request['form_id'],
                'form_class' => $request['form_class'],
                'form_theme' => $request['form_theme'],
                'rows' => $request['rows'],
            ];
            try {
                $this->form->post($form);
                return new WP_REST_Response(
                    'Le formulaire a été sauvegardé avec succès',
                    200
                );
            } catch (Exception $e) {
                return
                    new WP_REST_Response(
                        $e->getMessage(),
                        500
                    );
            }
        }

        function get_form(WP_REST_Request $request)
        {
            $conditions = null;
            if (isset($request['conditions'])) {
                $conditions = $request['conditions'];
            }
            try {
                $result = $this->form->get($conditions);
                return new WP_REST_Response(
                    $result,
                    200
                );
            } catch (Exception $e) {
                return
                    new WP_REST_Response(
                        $e->getMessage(),
                        500
                    );
            }
        }
    }

endif;
return new YF_api;
