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
            register_activation_hook(__FILE__, [$this, 'create_tables']);
            register_deactivation_hook(__FILE__, [$this, 'remove_tables']);
        }

        function create_tables()
        {
            global $wpdb;
            $plugin_name_db_version = '1.0';
            $charset_collate = $wpdb->get_charset_collate();
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            $queries = [
                "CREATE TABLE " . $wpdb->prefix . "_yf_form (
                id mediumint(9) NOT NULL AUTO_INCREMENT,
                form_id mediumtext NOT NULL,
                form_class mediumtext NOT NULL,
                form_theme tinytext NOT NULL,
                rows longtext NOT NULL,
                UNIQUE KEY id (id)
                ) $charset_collate;",
                "CREATE TABLE " . $wpdb->prefix . "_yf_submission (
                id mediumint(9) NOT NULL AUTO_INCREMENT,
                UNIQUE KEY id (id)
                ) $charset_collate;",
            ];

            foreach ($queries as $query) {
                dbDelta($query);
            }

            add_option('ygrek_form_db_version', $plugin_name_db_version);
        }

        function remove_tables()
        {
            global $wpdb;
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            $queries = [
                "DROP TABLE IF EXISTS " . $wpdb->prefix . "_yf_form",
                "DROP TABLE IF EXISTS " . $wpdb->prefix . "_yf_submission",
            ];
            foreach ($queries as $query) {
                dbDelta($query);
            }
        }
    }

endif;
return new YF_tables;
