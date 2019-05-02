<?php
	//call model
	require_once("../models/Asientos.php");
	require_once("../models/database.php");
	
	$a = new moAsientos();
	
	$tipo= $_GET['tipo'];
	$origen= $_GET['ori'];
	$destino= $_GET['des'];
	$pas1= $_GET['pas1'];
	$pas2= $_GET['pas2'];
	$pas3= $_GET['pas3'];
	$clase= $_GET['clase'];
	$f1= $_GET['f1'];
	$f2= $_GET['f2'];
	$v1= $_GET['v1'];
	$v2;
	
	if(!isset($_GET['v2']))
	{
		$v2= $_GET['v2']= '00-00-00';
	}
	else
	{	
		$v2= $_GET['v2'];
	}
	
	$asientos = $a -> getSeater($clase, $v1);
	
	$asientos =  $asientos . $a -> getPasajeros($_GET['pas1'], $_GET['pas2'], $_GET['pas3']);
	
	echo $asientos;
?>
