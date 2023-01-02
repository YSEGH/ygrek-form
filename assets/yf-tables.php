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
            register_activation_hook(__FILE__, [$this, 'create_table']);
            register_deactivation_hook(__FILE__, [$this, 'remove_table']);
        }

        function create_table()
        {
            global $wpdb;
            $plugin_name_db_version = '1.0';
            $table_name = $wpdb->prefix . 'ygrek_form';
            $charset_collate = $wpdb->get_charset_collate();

            $sql = "CREATE TABLE $table_name (
                    id mediumint(9) NOT NULL AUTO_INCREMENT,
                    form_id tinytext NULL,
                    UNIQUE KEY id (id)
                    ) $charset_collate;";

            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
            add_option('ygrek_form_db_version', $plugin_name_db_version);
        }

        function remove_table()
        {
            global $wpdb;
            $table_name = $wpdb->prefix . "ygrek_form";
            $sql = "DROP TABLE IF EXISTS $table_name";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }
    }

endif;
return new YF_tables;
