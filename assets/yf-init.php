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
 * SQL Form Table manager.
 *
 * @since 1.0.0
 */
if (file_exists(YF_DIR . '/assets/yf-form-tables.php')) {
    require_once(YF_DIR . '/assets/yf-form-tables.php');
}

/**
 * SQL Submission Table manager.
 *
 * @since 1.0.0
 */
if (file_exists(YF_DIR . '/assets/yf-submission-tables.php')) {
    require_once(YF_DIR . '/assets/yf-submission-tables.php');
}

/**
 * On activate plugin.
 *
 * @since 1.0.0
 */
if (file_exists(YF_DIR . '/assets/yf-on-activate.php')) {
    require_once(YF_DIR . '/assets/yf-on-activate.php');
}

/**
 * On deactivate plugin.
 *
 * @since 1.0.0
 */
if (file_exists(YF_DIR . '/assets/yf-on-deactivate.php')) {
    require_once(YF_DIR . '/assets/yf-on-deactivate.php');
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
 * Form controller.
 *
 * @since 1.0.0
 */
if (file_exists(YF_DIR . '/assets/yf-form-controller.php')) {
    require_once(YF_DIR . '/assets/yf-form-controller.php');
}
/**
 * Form API file.
 *
 * @since 1.0.0
 */
if (file_exists(YF_DIR . '/assets/yf-form-api.php')) {
    require_once(YF_DIR . '/assets/yf-form-api.php');
}
/**
 * Submission controller.
 *
 * @since 1.0.0
 */
if (file_exists(YF_DIR . '/assets/yf-submission-controller.php')) {
    require_once(YF_DIR . '/assets/yf-submission-controller.php');
}
/**
 * Submission API file.
 *
 * @since 1.0.0
 */
if (file_exists(YF_DIR . '/assets/yf-submission-api.php')) {
    require_once(YF_DIR . '/assets/yf-submission-api.php');
}
