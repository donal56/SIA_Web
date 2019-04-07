<?php
	//call model
	require_once("models/Vuelos.php");
	$v = new moVuelos();
	
	//call view
	require_once("views/Vuelos.phtml");

?>