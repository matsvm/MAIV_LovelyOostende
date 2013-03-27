<?php

require_once WWW_ROOT . 'controller' . DIRECTORY_SEPARATOR . 'AppController.php';

class HomeController extends AppController{


    public function __construct(){
        parent::__construct();
    }

    public function filter(){
        switch($this->action){
            default:
                return $this->index();
        }
    }

    public function index(){
        $content = $this->smarty->fetch('pages/home.tpl');
        $this->smarty->assign('page','Home');
        $this->smarty->assign('content', $content);
    }
}

?>