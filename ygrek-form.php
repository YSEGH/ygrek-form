<?php

use YgrekForm\Entity\Form;

/**
 * Plugin Name: Ygrek Form
 * Plugin URI:
 * Description: A form toolkit
 * Version: 1
 * Author: Youssef SEGHROUCHNI
 * Author URI:
 * Text Domain: Ygrek
 * Requires PHP: 7.2
 *
 * @package Ygrek
 */
if (!defined('ABSPATH')) exit;
class YgrekForm
{
    function __construct()
    {
        add_action('admin_menu', [$this, 'admin_menu']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_files']);
        register_activation_hook(__FILE__, [$this, 'create_table']);
        register_deactivation_hook(__FILE__, [$this, 'remove_table']);
        add_shortcode('load_form', [$this, 'load_form_shortcode']);
        add_action('ygrek_form_tab_links', [$this, 'tab_links']);
    }
    function admin_menu()
    {
        add_menu_page('Mes formulaires', 'Ygrek Form', 'manage_options', 'ygrek-form-liste');
        add_submenu_page(null, 'Mes formulaires', 'Liste', 'manage_options', 'ygrek-form-liste', [$this, 'admin_menu_list']);
        add_submenu_page(null, 'Ajouter', 'Ajouter', 'manage_options', 'ygrek-form-ajouter', [$this, 'admin_menu_add']);
        add_submenu_page(null, 'Mes soumissions', 'Soumissions', 'manage_options', 'ygrek-form-soumissions', [$this, 'admin_menu_submission']);
    }
    function admin_menu_list()
    {
        echo '<div id="ygrek-form-react-root"></div>';
    }
    function admin_menu_add()
    {
        echo '<div id="ygrek-form-react-root"></div>';
    }
    function admin_menu_submission()
    {
        echo '<div id="ygrek-form-react-root"></div>';
    }
    /* Enqueue scripts/style files */
    function enqueue_files()
    {
        wp_enqueue_script('ygrek-form-jsx', plugin_dir_url(__FILE__) . '/dist/bundle.js', array('jquery', 'wp-element'), time(), true);
        wp_enqueue_style('ygrek-form-style', plugin_dir_url(__FILE__) . '/assets/css/style.css', null, '1');
    }
    function create_table()
    {
        global $wpdb;
        $plugin_name_db_version = '1.0';
        $table_name = $wpdb->prefix . "ygrek_form";
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
    function load_form_shortcode()
    {
        $form = new Form();
        return $form->generateForm();
    }
    function tab_links()
    {
        $page = isset($_GET['page']) ? $_GET['page'] : null;
?>
        <header>
            <nav class="nav-tab-wrapper">
                <a href="?page=ygrek-form-liste" class="nav-tab <?php if ($page === 'ygrek-form-liste') : ?>nav-tab-active<?php endif; ?>">Liste</a>
                <a href="?page=ygrek-form-ajouter" class="nav-tab <?php if ($page === 'ygrek-form-ajouter') : ?>nav-tab-active<?php endif; ?>">Ajouter</a>
                <a href="?page=ygrek-form-soumissions" class="nav-tab <?php if ($page === 'ygrek-form-soumissions') : ?>nav-tab-active<?php endif; ?>">Soumissions</a>
            </nav>
        </header>
<?php
    }
}
$form = new YgrekForm();
