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

if (!class_exists('YF_submission_tables')) :

    class YF_submission_tables
    {

        function create_table()
        {
            global $wpdb;
            $plugin_name_db_version = '1.0';
            $charset_collate = $wpdb->get_charset_collate();
            $submission_table = $wpdb->prefix . 'yf_submission';
            $queries = [
                "CREATE TABLE $submission_table (
                    `id` mediumint(9) NOT NULL AUTO_INCREMENT,
                    `form_id` mediumint(9) NOT NULL,
                    `timestamp` bigint(20) unsigned NOT NULL,
                    `data` longtext NOT NULL,
                    `seen` boolean DEFAULT false,
                    PRIMARY KEY  (id)
                    ) $charset_collate;"
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
            $submission_table = $wpdb->prefix . 'yf_submission';
            $queries = [
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
