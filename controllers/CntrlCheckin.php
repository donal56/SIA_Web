<?php
if(!$_GET){
	//call model
	require_once("models/Boletos.php");
	$moBoleto = new moBoletos();
	//call view
	require_once("views/Checkin.phtml");
}else{	
	echo $_GET["numBoleto"]." hola";
/*$data = $moBoleto->isValidID($_GET["numBoleto"]);
	echo("<script>console.log('PHP: ".var_export($data,true)."');</script>"); */

}
	
?>