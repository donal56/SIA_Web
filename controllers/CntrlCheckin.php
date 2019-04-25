<?php
	//call model
	require_once($_SERVER['DOCUMENT_ROOT']."/models/database.php");
	require_once($_SERVER['DOCUMENT_ROOT']."/models/Boletos.php");
	$moBoleto = new moBoletos();

	if(!$_GET){
		//call view
		require_once("views/Checkin.phtml");
		
	}else{ 
		//call view
		require_once($_SERVER['DOCUMENT_ROOT']."/views/Templates.phtml");
		
		switch ($_GET["func"]) {
			case 0:

					if($moBoleto->isValidID($_GET["numBoleto"],$_GET["email"])){

						ticketChecked();

					}else{

						ticketError();			
					}

			break;

			case 1:
				echo 'confirmar';

			break;
		}
				
	}	


?>


