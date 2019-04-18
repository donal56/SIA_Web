<?php
	//call model
	require_once("models/Vuelos.php");
	$v = new moVuelos();
	
	$vuelos = v -> getVuelos($tipo, $origen, $destino, $pasajeros, $clase, $f1, $f2);
	
	//call view
	require_once("views/Vuelos.phtml");
	
	echo $vuelos;

?>