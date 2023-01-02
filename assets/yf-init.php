<?php

/**
 * YF Core Main File
 *
 * This is the main file of YF which controls everything in this plugin.
 *
 * @package YF
 * @since 	0.0.1
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) exit;

/**
 * Admin menu initializer.
 *
 * @since 1.0.0
 */
if (file_exists(YF_DIR . '/assets/yf-admin-menu.php')) {
    require_once(YF_DIR . '/assets/yf-admin-menu.php');
}

/**
 * SQL Table manager.
 *
 * @since 1.0.0
 */
if (file_exists(YF_DIR . '/assets/yf-tables.php')) {
    require_once(YF_DIR . '/assets/yf-tables.php');
}

/**
 * Scripts files.
 *
 * @since 1.0.0
 */
if (file_exists(YF_DIR . '/assets/yf-scripts.php')) {
    require_once(YF_DIR . '/assets/yf-scripts.php');
}

/**
 * Style files.
 *
 * @since 1.0.0
 */
if (file_exists(YF_DIR . '/assets/yf-style.php')) {
    require_once(YF_DIR . '/assets/yf-style.php');
}

/**
 * API file.
 *
 * @since 1.0.0
 */
if (file_exists(YF_DIR . '/assets/yf-api.php')) {
    require_once(YF_DIR . '/assets/yf-api.php');
}
