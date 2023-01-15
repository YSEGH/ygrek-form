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
        public function post($form)
        {
            global $wpdb;
            $submission_table = $wpdb->prefix . 'yf_submission';
            try {
                $wpdb->insert(
                    $submission_table,
                    [
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

        public function get($conditions)
        {
            global $wpdb;
            $submission_table = $wpdb->prefix . 'yf_submission';
            $query = "SELECT * FROM $submission_table";
            if ($conditions) {
                if (isset($conditions['id'])) {
                    $query .= " WHERE (form_id='" . $conditions['form_id'] . "'";
                }
                $query .= ")";
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

        public function delete()
        {
        }
    }
endif;
return new YF_submission_controller();
