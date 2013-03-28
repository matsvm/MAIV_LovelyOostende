<?php
    require_once 'smarty/Smarty.class.php';

class AppController
{
    protected $action = '';
    protected $smarty;

    public function __construct(){

        if(!empty($_GET['action'])){
            $this->action = $_GET['action'];
        }

        $this->smarty = new Smarty();
        $this->smarty->setTemplateDir("smarty_template");
        $this->smarty->setCompileDir("smarty_compile");
        $this->smarty->muteExpectedErrors();
    }

    public function filter(){

    }

    public function render(){
        $this->smarty->display('index.html');
    }
    
}

?>