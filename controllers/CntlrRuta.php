<?php
//call model
require_once("models/Rutas.php");
$rutas = new moRutas();
$origins = $rutas -> getOrigins();
$destins = $rutas -> getDestinations();
//call view
require_once("views/Home.phtml");

?>