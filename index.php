<?php 
require_once("/models/database.php");
?>

<!DOCTYPE html>

<html>
	<head>

		<title>AeroAlpes</title>
		<meta name= "index"  content="text/html" http-equiv="content-type" charset="utf-8">
		<meta name= "viewport" content="width= device-width, initial-scale= 1, user-scalable= no">
		<link rel= 'icon' type= 'image/ico' href= 'views/img/favicon.ico'>

		<!--JQuery-->
		<script	src= "https://code.jquery.com/jquery-3.3.1.min.js"
				integrity= "sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
				crossorigin= "anonymous"></script>
	
		
		<!--dhtmlx css & js-->
		<link rel="stylesheet" type="text/css" href="http://cdn.dhtmlx.com/edge/dhtmlx.css"/>
		<script src="http://cdn.dhtmlx.com/edge/dhtmlx.js"></script>
		
		<!--owner-->
		<link 	rel= "stylesheet" 	
				href= "views/css/styles.css" 
				type= "text/css">
		<script src="/views/js/functions.js"></script>

		
	</head>

<body  onload="initLang();" >

<div class="loader"></div>

<div id= "header">
		<a href= 'index.php'> <img class= 'logo' src= "views/img/logo1.png" alt= "Logo"> </a>

		<span class='langSel'>
			<select id="language" style="width:150%;" mode="image" onchange= "changeLanguage(this.form)">
				<option value= "es-MX" img_src="views/img/MX-flag.png">Español</option>
				<option value= "en-US" img_src="views/img/US-flag.png">English</option>
			</select>		
		</span>

		<span class= 'usuario'>
			<span style= "color: #31AFBD; font-size: 1.2em" > Usuario </span>
			<img src="views/img/man-user.png" alt= "Usuario" height="30">
		</span>

</div>

<div id= "main">
		<?php 
		require_once("controllers/CntlrRuta.php");
		?>
</div>

<div id= "footer">
		<img src="views/img/logo2.png" alt=" Logo" align=" left" style= 'height: 100%; margin: 0; padding: none; padding-right: 10px;'>

		<div class="textInfo">
			Col.Nueva Villahermosa<br>
			Calle Progreso #120 Piso 7 <br>
			Contacto (993) 297 82 61
		</div>

</div>

</body>

</html>
