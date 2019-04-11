<?php
	//salia error, asi que la volvi a llamar :v
	require_once("../models/database.php");
	require_once("../models/Usuarios.php");
	
	$u = new moUsuario();
	$matched = $u -> matchAccount($_POST['email'], $_POST['pwd']);
	
	if(isset($_POST['cerrarSesion']))
	{
		echo exitSession();
	}
	else
	{
		echo $matched;
	}
?>	