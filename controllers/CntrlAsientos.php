<?php
	//call model
	require_once("../models/Asientos.php");
	require_once("../models/database.php");
	
	$a = new moAsientos();
	
	if(!isset($_GET['v2']))
	{
		$_GET['v2']= '00-00-00';
	}
	
	$asientos = $a -> getAsientos($_GET['tipo'], $_GET['ori'], $_GET['des'], $_GET['pas1'], $_GET['pas2'], $_GET['pas3'], $_GET['clase'], $_GET['f1'], $_GET['f2'], $_GET['v1'], $_GET['v2']);
	
	
	
	echo $asientos;
?>