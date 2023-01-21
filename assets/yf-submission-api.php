<?php

/**
 * VF API
 *
 * This is the file for submission API.
 *
 * @package YF
 * @since 	0.0.1
 */


if (!defined('ABSPATH')) exit;

if (!class_exists('YF_submission_api')) :

    class YF_submission_api
    {
        public $submission;
        function __construct()
        {
            $this->submission = new YF_submission_controller();
            add_action('rest_api_init', [$this, 'register_route']);
        }

        function register_route()
        {
            register_rest_route(
                'yf-form/submission',
                '/add',
                array(
                    'methods' => 'POST',
                    'callback' => array($this, 'add_submission')
                )
            );
            register_rest_route(
                'yf-form/submission',
                '/get',
                array(
                    'methods' => 'GET',
                    'callback' => array($this, 'get_submission'),
                    'args' => [
                        'id' => [
                            'required' => false,
                            'type'     => 'number',
                        ],
                        'form_id' => [
                            'required' => false,
                            'type'     => 'number',
                        ],
                        'seen' => [
                            'required' => false,
                            'type'     => 'boolean',
                        ],
                    ],
                )
            );
            register_rest_route(
                'yf-form/submission',
                '/delete',
                array(
                    'methods' => 'DELETE',
                    'callback' => array($this, 'delete_submission'),
                    'args' => [
                        'id' => [
                            'required' => true,
                            'type'     => 'number',
                        ],
                    ],
                )
            );
        }

        function add_submission(WP_REST_Request $request)
        {
            $form = [
                'form_id' => $request['form_id'],
                'timestamp' => $request['timestamp'],
                'data' => $request['data'],
            ];
            try {
                $this->submission->check_submission($form['data']);
                $this->submission->post($form);
                return new WP_REST_Response(
                    [
                        'message' => 'La soumission a été sauvegardée avec succès',
                    ],
                    200
                );
            } catch (Exception $e) {
                $error = json_decode($e->getMessage());
                return
                    new WP_REST_Response(
                        $error,
                        $e->getCode()
                    );
            }
        }

        function get_submission(WP_REST_Request $request)
        {
            $arg = $request->get_params();
            try {
                $result = $this->submission->get($arg);
                return new WP_REST_Response(
                    [
                        'submissions' => $result,
                        'message' => "Les soumissions ont été récupérées avec succès."
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

        function delete_submission(WP_REST_Request $request)
        {
            $arg = $request->get_params();
            try {
                $this->submission->delete($arg);
                return new WP_REST_Response(
                    [
                        'message' => "Les soumissions ont été supprimées avec succès."
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
return new YF_submission_api();
