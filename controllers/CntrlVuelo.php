<?php
	//call model
	require_once("../models/Vuelos.php");
	require_once("../models/database.php");
	
	$v = new moVuelos();
	
	$vuelos = $v -> getVuelos($_GET['tipo'], $_GET['ori'], $_GET['des'], $_GET['pas1'], $_GET['pas2'], $_GET['pas3'], $_GET['clase'], $_GET['f1'], $_GET['f2']);
	
	echo $vuelos;
?>