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
                    'methods' => 'POST',
                    'callback' => array($this, 'get_submission')
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
                $this->submission->post($form);
                return new WP_REST_Response(
                    [
                        'message' => 'Le soumission a été sauvegardée avec succès',
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

        function get_submission(WP_REST_Request $request)
        {
            $conditions = null;
            if (isset($request['conditions'])) {
                $conditions = $request['conditions'];
            }

            try {
                $result = $this->submission->get($conditions);
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
    }

endif;
return new YF_submission_api();
