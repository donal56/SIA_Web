<?php
	//call model
	require_once($_SERVER['DOCUMENT_ROOT']."/models/database.php");
	require_once($_SERVER['DOCUMENT_ROOT']."/models/Boletos.php");
	$moBoleto = new moBoletos();

	if(!$_GET){
		//call view
		require_once("views/Checkin.phtml");
	}else{ 
		
		if($moBoleto->isValidID($_GET["numBoleto"],$_GET["email"])){
			echo <<<EOT
				<p>Presiona para confirmar su boleto, se enviará el pase de abordar a su correo
				<br>{$_GET['email']}</p>
				<button style="display:inline-block" id="btnTransparent" type= "button" >	
					<img style="width:100%" src="../views/img/check.png" alt="check">	
				</button><br>
				<button style="display:inline-block;float:none" type="button" class="btnSearch" onclick="solicitar('views/Checkin.phtml')">ó regresar &nbsp; ▶</button>
				
EOT;
		}else{
			echo <<<EOT
				<img style="width:100px" src="../views/img/error.png" alt="check">	
				<p>No se ha encontrado su boleto con el número: {$_GET["numBoleto"]} </p>
				<button style="display:inline-block;float:none" type="button" class="btnSearch" onclick="solicitar('views/Checkin.phtml');">
					Reintentar &nbsp; ▶
				</button>
EOT;
		}
}	
?>


