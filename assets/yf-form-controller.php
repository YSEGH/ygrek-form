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
            add_shortcode('ygrek_form', [$this, 'to_html']);
        }
        public function post($form)
        {
            global $wpdb;
            $form_table = $wpdb->prefix . 'yf_form';
            try {
                $wpdb->insert(
                    $form_table,
                    [
                        'form_title' => $form['form_title'],
                        'form_id' => $form['form_id'],
                        'form_class' => $form['form_class'],
                        'form_theme' => $form['form_theme'],
                        'rows' => $form['rows'],
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
            $form_table = $wpdb->prefix . 'yf_form';
            $query = "SELECT * FROM $form_table";
            if ($conditions) {
                if (isset($conditions['id'])) {
                    $query .= " WHERE (id='" . $conditions['id'] . "'";
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

        public function update()
        {
        }
        public function delete()
        {
        }

        public function to_html($atts)
        {
            global $wpdb;
            $form = [];
            $form_table = $wpdb->prefix . 'yf_form';
            $query = "SELECT * FROM $form_table";
            if (isset($atts['id'])) {
                $query .= " WHERE (id='" . $atts['id'] . "'";
            }
            $query .= ")";
            try {
                $form = $wpdb->get_results($query)[0];
                if ($wpdb->last_error) {
                    throw new Exception($wpdb->last_error, 500);
                }
            } catch (\Exception $e) {
                throw new Exception($e->getMessage(), 1);
            }
            $form_html = '';
            if ($form) {
                $form_html = '<form action="" data-form="ygrek-form" id="' . $form->form_id . '" class="ygrek_form ' . implode(' ', json_decode($form->form_class)) . ' ' . $form->form_theme . '">';
                foreach (json_decode($form->rows) as $row) {
                    $form_html .= '<div class="ygrek_form--row">';
                    foreach ($row->cols as $col) {
                        $form_html .= '<div class="' . implode(' ', $col->classname) . ' ' . implode(' ', $col->custom_class_field) . '">';
                        $form_html .= '<div class="ygrek_form--element">';
                        $form_html .= '<label class="ygrek_form--label ' . implode(' ', $col->custom_class_label) . '" for="' . $col->for . '">' . $col->label . '</label>';
                        switch ($col->input_element) {
                            case 'input':
                                $form_html .= '<div class="ygrek_form--field-wrapper">';
                                $form_html .= '<input class="ygrek_form--field ygrek_form--field-input ' . implode(' ', $col->custom_class_input) . '" data-title="' . $col->label . '" name="' . $col->for . '" type="' . $col->input_type . '" placeholder="' . $col->placeholder . '"></input>';
                                $form_html .= '</div>';
                                break;
                            case 'select':
                                $form_html .= '<div class="ygrek_form--field-wrapper">';
                                $form_html .= '<select name="' . $col->for . '" class="ygrek_form--field ygrek_form--field-select ' . implode(' ', $col->custom_class_input) . '" data-title="' . $col->label . '">';
                                $form_html .= '<option>' . $col->placeholder . '</option>';
                                foreach ($col->options as $option) {
                                    $form_html .= '<option value="' . $option->value . '">' . $option->title . '</option>';
                                }
                                $form_html .= '</select>';
                                $form_html .= '</div>';
                                break;
                            case 'textarea':
                                $form_html .= '<div class="ygrek_form--field-wrapper">';
                                $form_html .= '<textarea name="message" class="ygrek_form--field ygrek_form--field-textarea ' . implode(' ', $col->custom_class_input) . '" data-title="' . $col->label . '" placeholder="' . $col->placeholder . '"></textarea>';
                                $form_html .= '</div>';
                                break;
                            default:
                                break;
                        }
                        $form_html .= '<div class="ygrek_form--error-message"></div>';
                        $form_html .= '</div>';
                        $form_html .= '</div>';
                    }
                    $form_html .= '</div>';
                }
                $form_html .= '<button type="submit">Valider</button>';
                $form_html .= '</form>';
            }
            return $form_html;
        }
    }
endif;
return new YF_form_controller;
