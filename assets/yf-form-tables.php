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

if (!class_exists('YF_form_tables')) :

    class YF_form_tables
    {

        function create_table()
        {
            global $wpdb;
            $plugin_name_db_version = '1.0';
            $charset_collate = $wpdb->get_charset_collate();
            $form_table = $wpdb->prefix . 'yf_form';
            $queries = [
                "CREATE TABLE $form_table (
                    `id` mediumint(9) NOT NULL AUTO_INCREMENT,
                    `form_title` mediumtext NULL,
                    `form_id` mediumtext NULL,
                    `form_class` mediumtext NULL,
                    `form_theme` tinytext NULL,
                    `rows` longtext NULL,
                    PRIMARY KEY  (id)
                    ) $charset_collate;",
            ];
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            foreach ($queries as $query) {
                dbDelta($query);
            }
            add_option('ygrek_form_db_version', $plugin_name_db_version);
        }

        function remove_table()
        {
            global $wpdb;
            $form_table = $wpdb->prefix . 'yf_form';
            $queries = [
                "DROP TABLE IF EXISTS $form_table",
            ];
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            foreach ($queries as $query) {
                $wpdb->query($query);
            }
            delete_option("ygrek_form_db_version");
        }
    }

endif;
