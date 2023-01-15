<?php

/**
 * YF Activation
 *
 * This is the file for plugin activation.
 *
 * @package YF
 * @since 	0.0.1
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) exit;

if (!class_exists('YF_on_activate')) :

    class YF_on_activate
    {
        public $form_tables;
        public $submission_tables;
        function __construct()
        {
            $this->form_tables = new YF_form_tables();
            $this->submission_tables = new YF_submission_tables();
            register_activation_hook(YF_DIR . '/ygrek-form.php', [$this, 'on_activate']);
        }

        function on_activate()
        {
            $this->form_tables->create_table();
            $this->submission_tables->create_table();
        }
    }

endif;
return new YF_on_activate();
