<?php

/**
 * VF API
 *
 * This is the file for form API.
 *
 * @package YF
 * @since 	0.0.1
 */


if (!defined('ABSPATH')) exit;

if (!class_exists('YF_form_api')) :

    class YF_form_api
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
                'yf-form/form',
                '/add',
                array(
                    'methods' => 'POST',
                    'callback' => array($this, 'add_form')
                )
            );
            register_rest_route(
                'yf-form/form',
                '/get',
                array(
                    'methods' => 'GET',
                    'callback' => array($this, 'get_form'),
                    'args' => [
                        'id' => [
                            'required' => false,
                            'type'     => 'number',
                        ],
                        'form_id' => [
                            'required' => false,
                            'type'     => 'number',
                        ],
                    ],
                )
            );
            register_rest_route(
                'yf-form/form',
                '/update',
                array(
                    'methods' => 'PUT',
                    'callback' => array($this, 'update_form')
                )
            );
            register_rest_route(
                'yf-form/form',
                '/delete',
                array(
                    'methods' => 'DELETE',
                    'callback' => array($this, 'delete_form'),
                    'args' => [
                        'id' => [
                            'required' => false,
                            'type'     => 'number',
                        ],
                    ],
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
                    [
                        'message' => 'Le formulaire a été sauvegardé avec succès',
                    ],
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
            $arg = $request->get_params();
            try {
                $result = $this->form->get($arg);
                return new WP_REST_Response(
                    [
                        'forms' => $result,
                        'message' => "Les formulaires ont été récupérés avec succès."
                    ],
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

        function update_form(WP_REST_Request $request)
        {
            $form = [
                'id' => $request['id'],
                'form_title' => $request['form_title'],
                'form_id' => $request['form_id'],
                'form_class' => $request['form_class'],
                'form_theme' => $request['form_theme'],
                'rows' => $request['rows'],
            ];
            try {
                $this->form->update($form);
                return new WP_REST_Response(
                    [
                        'message' => 'Le formulaire a été modifié avec succès.',
                    ],
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

        function delete_form(WP_REST_Request $request)
        {
            $arg = $request->get_params();
            try {
                $this->form->delete($arg);
                return new WP_REST_Response(
                    [
                        'message' => "Le formulaire a été supprimée avec succès."
                    ],
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
return new YF_form_api();
