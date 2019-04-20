<?php
	//call model
	require_once($_SERVER['DOCUMENT_ROOT']."/models/database.php");
	require_once($_SERVER['DOCUMENT_ROOT']."/models/Boletos.php");
	$moBoleto = new moBoletos();

	if(!$_GET){
		//call view
		require_once("views/Checkin.phtml");
	}else{
		
		echo var_export($moBoleto->isValidID($_GET["numBoleto"]),true);
}
	
?>