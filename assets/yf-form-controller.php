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

        public function get($arg)
        {
            global $wpdb;
            $form_table = $wpdb->prefix . 'yf_form';
            $query = "SELECT * FROM $form_table";
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

        public function update($data)
        {
            global $wpdb;
            $form_table = $wpdb->prefix . 'yf_form';
            try {
                $wpdb->update(
                    $form_table,
                    array(
                        'form_title' => $data['form_title'],
                        'form_class' => $data['form_class'],
                        'form_theme' => $data['form_theme'],
                        'form_id' => $data['form_id'],
                        'rows' => $data['rows'],
                    ),
                    array('id' => $data['id']),
                    array('%s', '%s', '%s', '%s', '%s'),
                    array('%s')
                );
                if ($wpdb->last_error) {
                    throw new Exception($wpdb->last_error, 500);
                }
            } catch (\Exception $e) {
                throw new Exception($e->getMessage(), 1);
            }
        }

        public function delete($arg)
        {
            global $wpdb;
            $form_table = $wpdb->prefix . 'yf_form';
            $submission_table = $wpdb->prefix . 'yf_submission';
            try {
                $wpdb->delete($form_table, $arg);
                $wpdb->delete($submission_table, ['form_id' => $arg['id']]);
                if ($wpdb->last_error) {
                    throw new Exception($wpdb->last_error, 500);
                }
            } catch (\Exception $e) {
                throw new Exception($e->getMessage(), 1);
            }
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
                $form_html = '<div class="ygrek-form--container">';
                $form_html .= '<h1 data-form="' . $form->id . '" class="form__container--title">' . $form->form_title . '</h1>';
                $form_html .= '<form action="" data-form="ygrek-form" data-id="' . $form->id . '" id="' . $form->form_id . '" class="ygrek_form ' . implode(' ', json_decode($form->form_class)) . ' ' . $form->form_theme . '" novalidate>';
                foreach (json_decode($form->rows) as $row) {
                    $form_html .= '<div class="ygrek_form--row">';
                    foreach ($row->cols as $col) {
                        $required = '';
                        if ($col->required) {
                            $required = 'required';
                        }
                        $form_html .= '<div class="' . implode(' ', $col->classname) . ' ' . implode(' ', $col->custom_class_field) . '">';
                        $form_html .= '<div class="ygrek_form--element element--' . $col->input_element . '-' . $col->input_type . '" data-col="col--' . $col->col_id . '">';
                        $form_html .= '<h4 class="ygrek_form--field-title ' . implode(' ', $col->custom_class_label) . '" for="' . $col->input . '-' . $col->col_id . '">' . $col->label . '</h4>';
                        switch ($col->input_element) {
                            case 'input':
                                switch ($col->input_type) {
                                    case "text":
                                    case "date":
                                    case "email":
                                    case "tel":
                                    case "color":
                                        $form_html .= '<div class="ygrek_form--field-wrapper">';
                                        $form_html .= '<input ' . $required . ' class="ygrek_form--field ygrek_form--field-input ' . implode(' ', $col->custom_class_input) . '" data-type="' . $col->input . '" id="' . $col->input .  '-' . $col->col_id . '" type="' . $col->input_type . '" placeholder="' . $col->placeholder . '"></input>';
                                        $form_html .= '</div>';
                                        break;
                                    case "file":
                                        $form_html .= '<div class="ygrek_form--field-wrapper">';
                                        $form_html .= '<label class="ygrek_form--label ' . implode(' ', $col->custom_class_label) . '" for="' . $col->input . '-' . $col->col_id . '">Choisir un fichier</label>';
                                        $form_html .= '<input ' . $required . ' class="ygrek_form--field ygrek_form--field-input ' . implode(' ', $col->custom_class_input) . '" data-type="' . $col->input . '" id="' . $col->input .  '-' . $col->col_id . '" type="' . $col->input_type . '" placeholder="' . $col->placeholder . '"></input>';
                                        $form_html .= '</div>';
                                        break;
                                    case "radio":
                                    case "checkbox":
                                        $form_html .= '<div class="ygrek_form--field-wrapper">';
                                        foreach ($col->options as $option) {
                                            $form_html .= '<div class="ygrek_form--radio-wrapper">';
                                            $form_html .= '<label class="ygrek_form--label ' . implode(' ', $col->custom_class_label) . '" for="' . $option->value . '-' . $col->col_id . '">' . $option->label . '</label>';
                                            $form_html .= '<input name="' . $col->input . '-' . $col->col_id . '" ' . $required . ' class="ygrek_form--field ygrek_form--field-input ' . implode(' ', $col->custom_class_input) . '" data-type="' . $col->input . '" id="' . $option->value .  '-' . $col->col_id . '" type="' . $col->input_type . '"></input>';
                                            $form_html .= '</div>';
                                        }
                                        $form_html .= '</div>';
                                        break;
                                    default:
                                        # code...
                                        break;
                                }

                                break;
                            case 'select':
                                $form_html .= '<div class="ygrek_form--field-wrapper">';
                                $form_html .= '<select id="' . $col->input .  '-' . $col->col_id . '" name="' . $col->for . '" class="ygrek_form--field ygrek_form--field-select ' . implode(' ', $col->custom_class_input) . '" data-type="' . $col->input . '">';
                                $form_html .= '<option>' . $col->placeholder . '</option>';
                                foreach ($col->options as $option) {
                                    $form_html .= '<option value="' . $option->value . '">' . $option->label . '</option>';
                                }
                                $form_html .= '</select>';
                                $form_html .= '</div>';
                                break;
                            case 'textarea':
                                $form_html .= '<div class="ygrek_form--field-wrapper">';
                                $form_html .= '<textarea id="' . $col->input .  '-' . $col->col_id . '" class="ygrek_form--field ygrek_form--field-textarea ' . implode(' ', $col->custom_class_input) . '" data-type="' . $col->input . '" placeholder="' . $col->placeholder . '"></textarea>';
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
                $form_html .= '<button form="' . $form->form_id . '" type="submit">Valider</button>';
                $form_html .= '</form>';
                $form_html .= '</div>';
            }
            return $form_html;
        }
    }
endif;
return new YF_form_controller();
