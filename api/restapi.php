<?php
define('WWW_ROOT', dirname(__FILE__) . DIRECTORY_SEPARATOR);

require_once WWW_ROOT . 'includes' . DIRECTORY_SEPARATOR . 'functions.php';
require_once WWW_ROOT . 'classes' . DIRECTORY_SEPARATOR . 'Config.php';
require_once(WWW_ROOT . 'dao' . DIRECTORY_SEPARATOR . 'UserDAO.php');
require_once(WWW_ROOT . 'dao' . DIRECTORY_SEPARATOR . 'EventDAO.php');
require_once(WWW_ROOT . 'dao' . DIRECTORY_SEPARATOR . 'VenueDAO.php');

require_once(WWW_ROOT . 'dao' . DIRECTORY_SEPARATOR . 'RegistrationDAO.php');
require_once(WWW_ROOT . 'Slim' . DIRECTORY_SEPARATOR . 'Slim.php');

$app = new Slim();

$app->post('/users/login','login');
$app->post('/users/register','addUser');
$app->get('/events','getEventsByUser');
$app->delete('/events/removeIt/:id','removeEvents');
$app->get('/venues','getVenuesByCat');
$app->post('/events/add','addEvents');



$app->run();

function getVenuesByCat(){
    $request = Slim::getInstance()->request();
   
    $venueDAO = new VenueDAO();
    echo json_encode($venueDAO->getVenuesByCat());
}

function login()
{
    $request = Slim::getInstance()->request();
    $userDAO = new UserDAO();
    $result = $userDAO->login($request->post());

    echo json_encode($result);
}

function addUser()
{
    $request = Slim::getInstance()->request();
    $userDAO = new UserDAO();
    $result = $userDAO->addUser($request->post());

    echo json_encode($result);
}


function getEventsByUser()
{
    $request = Slim::getInstance()->request();
    $key = $request->get('key');

    $eventDAO = new EventDAO();
    echo json_encode($eventDAO->getEventsByUser($key));
}

function addEvents()
{

    $request = Slim::getInstance()->request();
    $eventDAO = new EventDAO();
    $result = $eventDAO->addEvent($request->post());

    echo json_encode($result);
}


function removeEvents($id)
{
   
    $request = Slim::getInstance()->request();
    //$hetID = $request->get('key');

    $eventDAO = new EventDAO();
    //$result = $eventDAO->addEvent($hetID));
    echo json_encode($eventDAO->removeEvents($id));

    //echo json_encode($result);
}

