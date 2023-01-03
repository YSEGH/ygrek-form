<?php

/**
 * VF Core Table
 *
 * This is the file for SQL table.
 *
 * @package YF
 * @since 	0.0.1
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) exit;

if (!class_exists('YF_tables')) :

    class YF_tables
    {
        function __construct()
        {
            register_activation_hook(YF_DIR . '/ygrek-form.php', [$this, 'on_activate']);
            register_deactivation_hook(YF_DIR . '/ygrek-form.php', [$this, 'on_deactivate']);
        }

        function on_activate(){
            $this->create_tables();
        }

        function on_deactivate(){
            $this->remove_tables();
        }

        function create_tables()
        {
            global $wpdb;
            $plugin_name_db_version = '1.0';
            $charset_collate = $wpdb->get_charset_collate();
            $form_table = $wpdb->prefix . 'yf_form';
            $submission_table = $wpdb->prefix . 'yf_submission';
            $queries = [
                "CREATE TABLE $form_table (
                    `id` mediumint(9) NOT NULL AUTO_INCREMENT,
                    `form_id` mediumtext NOT NULL,
                    `form_class` mediumtext NOT NULL,
                    `form_theme` tinytext NOT NULL,
                    `rows` longtext NOT NULL,
                    PRIMARY KEY  (id)
                    ) $charset_collate;",
                "CREATE TABLE $submission_table (
                    `id` mediumint(9) NOT NULL AUTO_INCREMENT,
                    PRIMARY KEY  (id)
                    ) $charset_collate;"
            ];
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            foreach ($queries as $query){
                dbDelta($query);
            }
            add_option('ygrek_form_db_version', $plugin_name_db_version);
        }

        function remove_tables()
        {
            global $wpdb;
            $form_table = $wpdb->prefix . 'yf_form';
            $submission_table = $wpdb->prefix . 'yf_submission';
            $queries = [
                "DROP TABLE IF EXISTS $form_table",
                "DROP TABLE IF EXISTS $submission_table",
            ];
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            foreach ($queries as $query) {
                $wpdb->query($query);
            }
            delete_option("ygrek_form_db_version");
        }
    }

endif;
return new YF_tables;
