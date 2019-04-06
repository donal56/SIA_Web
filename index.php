<?php 
require_once("/models/database.php");
?>

<!DOCTYPE html>

<html>
	<head>

		<title>AeroAlpes</title>
		<meta name= "index"  content="text/html;" http-equiv="content-type" charset="utf-8">
		<meta name= "viewport" content="width= device-width, initial-scale= 1, user-scalable= no">
		<link rel= 'icon' type= 'image/ico' href= 'views/img/favicon.ico'>

		<!--Bootstrap, Bootstrap-select, propios-->
		<link 	rel= "stylesheet" 
				href= "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" 
				integrity= "sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" 
				crossorigin= "anonymous"
				type= "text/css">
		<link 	rel= "stylesheet" 	
				href= "https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.7/di8st/css/bootstrap-select.min.css"
				type= "text/css">
		<link 	rel= "stylesheet" 	
				href= "views/css/styles.css" 
				type= "text/css">

		<!--JQuery, Popper.JS, Bootstrap, Bootrasp-select-->
		<!--El orden es importante-->
		<script	src= "https://code.jquery.com/jquery-3.3.1.min.js"
				integrity= "sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
				crossorigin= "anonymous"></script>
		<script src= "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" 
				integrity= "sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" 
				crossorigin= "anonymous"></script>
		<script src= "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" 
				integrity= "sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" 
				crossorigin= "anonymous"></script>
		<script src= "https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.7/dist/js/bootstrap-select.min.js"></script>
		<script src= "views/js/functions.js"></script>
		
		
	
	</head>

<body>

<div class="loader"></div>

<div id= "header">
		<a href= 'index.php'> <img class= 'logo' src= "views/img/logo1.png" alt= "Logo"> </a>

		<span class= 'langSel'>
		<select class= "selectpicker show-tick" data-width= '130%' onchange= "changeLanguage(this.form)">

			<option data-content="<img src= 'views/img/MX-flag.png' style= 'width: 30%'>  Español" title= 'Español' value= "es-MX" selected></option>
			<option data-content="<img src= 'views/img/US-flag.png' style= 'width: 30%'>  English" title= 'English'	value= "en-US"></option>

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
