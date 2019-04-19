<?php
	//call model
	require_once("models/Boletos.php");
	$moBoleto = new moBoletos();
	
	$data = $moBoleto->isValidID("A123456789");
	echo("<script>console.log('PHP: ".var_export($data,true)."');</script>");
		
	//call view
	require_once("views/Checkin.phtml")
?>