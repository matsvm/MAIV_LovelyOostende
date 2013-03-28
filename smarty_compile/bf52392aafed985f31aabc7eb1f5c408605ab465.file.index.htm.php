<?php /* Smarty version Smarty-3.1.8, created on 2013-03-28 23:46:06
         compiled from "smarty_template/index.htm" */ ?>
<?php /*%%SmartyHeaderCode:12583208995154c02def0ff7-58719083%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'bf52392aafed985f31aabc7eb1f5c408605ab465' => 
    array (
      0 => 'smarty_template/index.htm',
      1 => 1364510734,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '12583208995154c02def0ff7-58719083',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_5154c02defa161_36962528',
  'variables' => 
  array (
    'content' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5154c02defa161_36962528')) {function content_5154c02defa161_36962528($_smarty_tpl) {?><!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name = "viewport" content = "initial-scale = 1.0,user-scalable = no"/>

    
    <title>Lovely Oostende Jonas</title>


    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
    <script type="text/javascript" src="assets/js/app.js"></script>

    <!--<link href="assets/css/custom.css" rel="stylesheet" type="text/css" media="screen and (max-width:320px) and (max-width:480px)" />-->
     <link href="assets/css/normalize.css" rel="stylesheet" type="text/css" media="screen"/>

     <link href="assets/css/custom.css" rel="stylesheet" type="text/css" media="screen"/>
     <link href='http://fonts.googleapis.com/css?family=Maven+Pro:400,700' rel='stylesheet' type='text/css'>


</head>

<body>
    

<div id="container">
    <div id="startPage">
        <div class="menuBar">
            <div class="info"><p>i</p></div>
            <div class="title"><p>Dag uitstippelen</p></div>
            <div class="dagtripIcon"><span>0</span></div>
        </div>


    <div id="infoContent" class="infoBar">
    </div>

            <!--<div class="infoBarIII">FOTO</div>
            <div class="infoBarIV"><h2>De vuurtoren</h2><p>Straatnaam 432 Oostende</p></div>
            <div class="infoBarArrow"><img src="assets/images/arrow.png" width="17"></div>
            <div class="infoBarV"><div class="Minibutten"> + toevoegen aan dagtrip</div></div>-->


        <?php echo $_smarty_tpl->tpl_vars['content']->value;?>

    </div>
    <ul class="tiles">
        <li><p class="zintuig dichtbij">Dichtbij</p></li>
        <li><p class="zintuig zien">Zien</p></li>
        <li><p class="zintuig proeven">Proeven</p></li>
        <li><p class="zintuig ruiken">Ruiken</p></li>
        <li><p class="zintuig voelen">Voelen</p></li>
        <li><p class="zintuig horen">Horen</p></li>
    </ul>
    </div>
   
</div>
</body>

</html>
<?php }} ?>