﻿<?php 
	require_once("./models/database.php");
	
	if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) 
	{
		
	} 
	else 
	{
		
	}
?>
<!DOCTYPE html>

<html>
	<head>

		<title>AeroAlpes</title>
		<meta name= "index"  content="text/html" http-equiv="content-type" charset="utf-8">
		<meta name= "viewport" content="width= device-width, initial-scale= 1, user-scalable= no" id= "viewport">
		<link rel= 'icon' type= 'image/ico' href= 'views/img/favicon.ico'>

		<!--JQuery-->
		<script	src= "https://code.jquery.com/jquery-3.3.1.min.js"
				type= "text/javascript" 
				integrity= "sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
				crossorigin= "anonymous"></script>
				
		<script src= 'views/js/jquery.translate.js'
				language= 'javascript'
				type= 'text/javascript'></script>
		
		<!--owner-->
		<link 	rel= "stylesheet" 	
				href= "views/css/styles.css" 
				type= "text/css">
		<script type= "text/javascript" 
				src= "views/js/functions.js"></script>
		
		<!--dhtmlx css & js-->
		<link 	rel="stylesheet" 
				type="text/css" 
				href="https://cdn.dhtmlx.com/edge/dhtmlx.css"/>
		<script type= "text/javascript" 
				src="https://cdn.dhtmlx.com/edge/dhtmlx.js" defer></script>
				
		<!--email using smtp-->
		<script type= "text/javascript" 
				src="https://smtpjs.com/v3/smtp.js" async ></script>

	</head>

<body onload= "initDHTMLX();">

<div id="loader">
	<img class="imgLoader" src="views/img/plane_load.gif"  alt="loading">
	
	<div id="winLoader" style="display: none; background-color: rgba(49,153,218,.8); height: 101%;">
		<img class="imgLoader" src="views/img/plane_load.gif"  alt="loading">
	</div>

</div>


<div id= "header">
		<a href= '/'> <img class= 'logo' src= "views/img/logo1.png" alt= "Logo"> </a>

		<div class='langSel'>
			<select id="language" style="width:160%;" mode="image" onchange= "changeLang(this.value);" style='cursor:pointer'>

				<option value= "es-MX" img_src= "views/img/MX-flag.png">Español</option>
				<option value= "en-US" img_src= "views/img/US-flag.png">English</option>
				<option value= "fr-FR" img_src= "views/img/FR-flag.png">Français</option>
			</select>		
		</div>

		<span class= 'usuario'> 
			<span id= "userLabel" class= 'trn'>Usuario</span>&nbsp;
			<img src= "views/img/man-user.png" alt= "Usuario" height="30" onclick="showLogin(this);" onblur="hideLogin();">
		</span>
		
		<div id="opcionesUsuario" style= "display:none; font-family: Segoe UI Semibold;">
			<a onclick= 'hideLogin();solicitar("views/Checkin.phtml");'>Check-in</a> <hr> <a onclick="cerrarSesion();">Cerrar sesión</a>
		</div>
</div>

<div id= "main">
	<div id="content">
		 <?php 
			require_once("controllers/CntrlRuta.php");
			//require_once("controllers/CntrlVuelo.php");
			//require_once("controllers/CntrlCheckin.php");

		?>
	</div>
		
	<div id= "footer">
		<div class = "textInfo">
			<img src="views/img/logo2.png" alt="Logo" style= 'margin-right: 10px'>	
			<span class= "trn">Col. Nueva Villahermosa</span><br>
			<span class= "trn">Calle Progreso #120 Piso 7</span><br>
			<span class= "trn">Contacto (993) 297 82 61</span>
		</div>

	</div>

</div>

</body>

</html>
