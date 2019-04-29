<?php
	//salia error, asi que la volvi a llamar :v
	require_once("../models/database.php");
	require_once("../models/Usuarios.php");
	
	$u = new moUsuario();

	if(!isset($_POST['pass'])){
		
		
		$matched = $u -> matchAccount($_POST['email'], $_POST['pwd']);
	
	
		if(isset($_POST['cerrarSesion']))
		{
			echo exitSession();
		}
		else
		{
			echo $matched;
		}
		
	}else{
		require_once("../views/Templates.phtml");
		if($u ->registerAccount($_POST['email'], $_POST['pass'])){
				$req = array(
						"html" => 	successRegister(),
						"mail" =>   emailRegisUser(),
					);
		
			echo json_encode($req);
		}
	}
	

?>	