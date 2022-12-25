<?php

namespace YgrekForm\Entity;

class Form
{
    public $form;
    function __construct()
    {
        $this->form = [
            'form_id' => '1',
            'form_title' => 'user-billing-info',
            'custom_class' => ['custom-form'],
            'elements' => [
                [
                    [
                        'col_size' => 'col-6',
                        'for' => 'name',
                        'label' => 'Nom',
                        'custom_class_label' => ['label--text'],
                        'field' => 'input',
                        'custom_class_field' => ['input--text'],
                        'options' => [],
                        'type' => 'text',
                        'required' => true,
                        'placeholder' => 'Ceci est un text',
                    ],
                    [
                        'col_size' => 'col-6',
                        'for' => 'phone',
                        'label' => 'Téléphone',
                        'custom_class_label' => ['label--tel'],
                        'field' => 'input',
                        'custom_class_field' => ['input--tel'],
                        'options' => [],
                        'type' => 'tel',
                        'required' => true,
                        'placeholder' => 'Ceci est un tel',
                    ]
                ],
                [
                    [
                        'col_size' => 'col-12',
                        'for' => 'address_1',
                        'label' => 'Numéro et nom de rue',
                        'custom_class_label' => ['label--address_1'],
                        'field' => 'input',
                        'custom_class_field' => ['select-address_1'],
                        'options' => [],
                        'type' => 'text',
                        'required' => true,
                        'placeholder' => '',
                    ],
                    [
                        'col_size' => 'col-12',
                        'for' => 'address_2',
                        'label' => 'Numéro et nom de rue',
                        'custom_class_label' => ['label--address_2'],
                        'field' => 'input',
                        'custom_class_field' => ['select--address_2'],
                        'options' => [],
                        'type' => 'text',
                        'required' => false,
                        'placeholder' => '',
                    ]
                ],
                [
                    [
                        'col_size' => 'col-6',
                        'for' => 'city',
                        'label' => 'Ville',
                        'custom_class_label' => ['label--city'],
                        'field' => 'input',
                        'custom_class_field' => ['select--city'],
                        'options' => [],
                        'type' => 'text',
                        'required' => true,
                        'placeholder' => '',
                    ],
                    [
                        'col_size' => 'col-6',
                        'for' => 'postal_code',
                        'label' => 'Code postal',
                        'custom_class_label' => ['label--postal_code'],
                        'field' => 'input',
                        'custom_class_field' => ['select--postal_code'],
                        'options' => [],
                        'type' => 'text',
                        'required' => false,
                        'placeholder' => '',
                    ]
                ],
                [
                    [
                        'col_size' => 'col-12',
                        'for' => 'name',
                        'label' => 'Nom',
                        'custom_class_label' => ['label--email'],
                        'field' => 'input',
                        'custom_class_field' => ['input--email'],
                        'options' => [],
                        'type' => 'text',
                        'required' => true,
                        'placeholder' => 'Ceci est un test',
                    ],
                ],
            ]
        ];
    }

    public function generateForm()
    {
        $form_html = '<form action="" id="' . $this->form['form_title'] . '" class="ygrek_form ' . implode(' ', $this->form['custom_class']) . '">';
        foreach ($this->form['elements'] as $row) {
            $form_html .= '<div class="ygrek_form--row">';
            foreach ($row as $col) {
                $form_html .= '<div class="ygrek_form--col ygrek_form--' . $col['col_size'] . '">';
                $form_html .= '<div class="ygrek_form--element">';
                $form_html .= '<label class="ygrek_form--label ' . implode(' ', $col['custom_class_label']) . '" for="' . $col['for'] . '">' . $col['label'] . '</label>';
                switch ($col['field']) {
                    case 'input':
                        $form_html .= '<div class="ygrek_form--field-wrapper">';
                        $form_html .= '<input class="ygrek_form--field ygrek_form--field-input ' . implode(' ', $col['custom_class_field']) . '" name="' . $col['for'] . '" type="' . $col['type'] . '" placeholder="' . $col['placeholder'] . '"></input>';
                        $form_html .= '</div>';
                        break;
                    case 'select':
                        $form_html .= '<div class="ygrek_form--field-wrapper">';
                        $form_html .= '<select name="' . $col['for'] . '" class="ygrek_form--field ygrek_form--field-select ' . implode(' ', $col['custom_class_field']) . '">';
                        $form_html .= '<option>' . $col['placeholder'] . '</option>';
                        foreach ($col['options'] as $option) {
                            $form_html .= '<option value="' . $option['value'] . '">' . $option['title'] . '</option>';
                        }
                        $form_html .= '</select>';
                        $form_html .= '</div>';
                        break;
                    case 'textarea':
                        $form_html .= '<div class="ygrek_form--field-wrapper">';
                        $form_html .= '<textarea name="message" class="ygrek_form--field ygrek_form--field-textarea ' . implode(' ', $col['custom_class_field']) . '" placeholder="' . $col['placeholder'] . '"></textarea>';
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
        return $form_html;
    }
}
