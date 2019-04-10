<?php
	//call model
	require_once("models/Vuelos.php");
	
	// $tipo= $_POST['tipo'];
	// $origen= $_POST['origen'];
	// $destino= $_POST['destino'];
	// $pasajeros= $_POST['pasajeros'];
	// $clase= $_POST['clase'];
	// $f1= $_POST['fechaSal'];
	// $f2= $_POST['fechaReg'];
	
	$tipo= "Sencillo";
	$origen= "Ciudad de México";
	$destino= "Cancún";
	$pasajeros= "1 2 3";
	$clase= "VIP";
	$f1= "2019-03-02";
	$f2= "";
	
	$v = new moVuelos();
	$vuelos = $v -> getVuelos($tipo, $origen, $destino, $pasajeros, $clase, $f1, $f2);
	//call view
	require_once("views/Vuelos.phtml");

?>