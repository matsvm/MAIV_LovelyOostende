<?php
define('WWW_ROOT', dirname(__FILE__) . DIRECTORY_SEPARATOR);

session_start();

require_once WWW_ROOT . 'includes' . DIRECTORY_SEPARATOR . 'functions.php';
set_error_handler('globalErrorHandler');
set_exception_handler('globalExceptionHandler');

require_once WWW_ROOT . 'classes' . DIRECTORY_SEPARATOR . 'Config.php';
require_once WWW_ROOT . 'classes' . DIRECTORY_SEPARATOR . 'CodePDO.php';

$page = isset($_GET['page']) ? $_GET['page'] : '';

$controller = NULL;

switch( $page ){

    case "home":
        require_once WWW_ROOT . 'controller' .DIRECTORY_SEPARATOR . 'HomeController.php';
        $controller = new HomeController();
        break;

    default:
        require_once WWW_ROOT . 'controller' .DIRECTORY_SEPARATOR . 'HomeController.php';
        $controller = new HomeController();
        break;
}

$controller->filter();
$controller->render();

?>