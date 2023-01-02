<?php

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
 * @package YF
 */
if (!defined('ABSPATH')) exit;

if (!defined('YF_NAME')) {
    define('YF_NAME', trim(dirname(plugin_basename(__FILE__)), '/'));
}

// YC Dir.
if (!defined('YF_DIR')) {
    define('YF_DIR', WP_PLUGIN_DIR . '/' . YF_NAME);
}

// YF URL.
if (!defined('YF_URL')) {
    define('YF_URL', WP_PLUGIN_URL . '/' . YF_NAME);
}
class YF_plugin
{
    function __construct()
    {
        require_once YF_DIR . '/assets/yf-init.php';
        //        add_shortcode('load_form', [$this, 'load_form_shortcode']);
    }

    /*     function load_form_shortcode()
    {
        $form = new Form();
        return $form->generateForm();
    } */
}
return new YF_plugin();
