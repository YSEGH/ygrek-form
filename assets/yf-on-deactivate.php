<?php

/**
 * YF Deactivation
 *
 * This is the file for plugin deactivation.
 *
 * @package YF
 * @since 	0.0.1
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) exit;

if (!class_exists('YF_on_deactivate')) :

    class YF_on_deactivate
    {
        public $form_tables;
        public $submission_tables;
        function __construct()
        {
            $this->form_tables = new YF_form_tables();
            $this->submission_tables = new YF_submission_tables();
            register_deactivation_hook(YF_DIR . '/ygrek-form.php', [$this, 'on_deactivate']);
        }

        function on_deactivate()
        {
            $this->form_tables->remove_table();
            $this->submission_tables->remove_table();
        }
    }

endif;
return new YF_on_deactivate();
