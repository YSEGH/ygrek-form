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

if (!class_exists('YF_submission_controller')) :
    class YF_submission_controller
    {
        public function check_submission(string $data)
        {
            $data = json_decode($data);
            $exceptions = [];
            foreach ($data as $element) {
                $required = $this->is_required($element);
                if ($required) {
                    $exceptions[$element->title] = $required;
                }
                switch ($element->title) {
                    case "nom":
                    case "prenom":
                    case "texte_court":
                    case "texte_long":
                        break;
                    case "telephone":
                        break;
                    case "file":
                        break;
                    case "date":
                        break;
                    case "email":
                        if (!array_key_exists($element->title, $exceptions)) {
                            $email = $this->is_email($element);
                            if ($email) {
                                $exceptions[$element->title] = $email;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            if (!empty($exceptions)) {
                $exception = new Exception('Un problème est survenu lors de la validation des données', 400);
                $exception->data = $exceptions;
                throw $exception;
            }
        }

        protected function is_required(object $element)
        {
            if ($element->required === TRUE) {
                if ($element->value === '') {
                    return [
                        'col_id' => $element->col_id,
                        'message' => 'Ce champ est requis.',
                    ];
                };
            }
        }
        protected function is_email(object $element)
        {
            if (!filter_var($element->value, FILTER_VALIDATE_EMAIL)) {
                return [
                    'col_id' => $element->col_id,
                    'message' => 'Merci de saisir une adresse email valide.',
                ];
            }
        }
        public function post($form)
        {
            global $wpdb;
            $submission_table = $wpdb->prefix . 'yf_submission';
            try {
                $wpdb->insert(
                    $submission_table,
                    [
                        'form_title' => $form['form_title'],
                        'form_id' => $form['form_id'],
                        'timestamp' => $form['timestamp'],
                        'data' => $form['data'],
                    ]
                );
                if ($wpdb->last_error) {
                    throw new Exception($wpdb->last_error, 500);
                }
            } catch (\Exception $e) {
                throw new Exception($e->getMessage(), 1);
            }
        }

        public function get($arg)
        {
            global $wpdb;
            $submission_table = $wpdb->prefix . 'yf_submission';
            $query = "SELECT * FROM $submission_table";
            $count_arg = 0;
            if (!empty($arg)) {
                $query .= " WHERE ";
                if (isset($arg['id'])) {
                    $query .= " id = '" . $arg['id'] . "'";
                }
                if (isset($arg['form_id'])) {
                    if ($count_arg > 0) {
                        $query .= ' AND ';
                    }
                    $query .= " form_id = '" . $arg['form_id'] . "'";
                }
                if (isset($arg['seen'])) {
                    if ($count_arg > 0) {
                        $query .= ' AND ';
                    }
                    $query .= " seen = '" . $arg['seen'] . "'";
                }
            }
            try {
                $result = $wpdb->get_results($query);
                if ($wpdb->last_error) {
                    throw new Exception($wpdb->last_error, 500);
                }
                return $result;
            } catch (\Exception $e) {
                throw new Exception($e->getMessage(), 1);
            }
        }

        public function delete($arg)
        {
            global $wpdb;
            $submission_table = $wpdb->prefix . 'yf_submission';
            try {
                $result = $wpdb->delete($submission_table, $arg);
                if ($wpdb->last_error) {
                    throw new Exception($wpdb->last_error, 500);
                }
                return $result;
            } catch (\Exception $e) {
                throw new Exception($e->getMessage(), 1);
            }
        }
    }
endif;
return new YF_submission_controller();
