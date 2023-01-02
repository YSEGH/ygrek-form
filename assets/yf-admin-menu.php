<?php

/**
 * Class for custom admin menu
 *
 * Custom YF admin menu.
 *
 * @since 	1.0.0
 * @package YF
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

if (!class_exists('YF_Admin_Menu')) :

	class YF_Admin_Menu
	{
		function __construct()
		{
			add_action('admin_menu', [$this, 'admin_menu']);
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
	}

endif;
// Initiate the class.
return new YF_Admin_Menu();
