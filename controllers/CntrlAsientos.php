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
	$isRound= false;
	
	if(!isset($_GET['v2']))
	{
		$v2= $_GET['v2']= '00-00-00';		
	}
	else
	{	
		$v2= $_GET['v2'];
		$isRound= $isRound xor true;
	}
	
	$asientos = $a -> getPasajeros($tipo, $origen, $destino, $pas1, $pas2, $pas3, $clase, $f1, $f2, $v1, $v2, $isRound);
	
	$asientos= $asientos . $a -> getSeater($clase, $v1);
	
	echo $asientos;
?>
