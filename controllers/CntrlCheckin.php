<?php
	//call model
	require_once("../models/database.php");
	require_once("../models/Boletos.php");
	$moBoleto = new moBoletos();

	if(!$_GET){
		//call view
		require_once("../views/Checkin.phtml");
		
	}else{ 
		//call view
		require_once("../views/Templates.phtml");
		
		switch ($_GET["func"]) {
			case 0:

					if($moBoleto->isValidID($_GET["numBoleto"],$_GET["email"])){
						ticketChecked();

					}else{
						ticketError();			
					}

			break;

			case 1:
				
					if($moBoleto->confirmID($_GET["numBoleto"])){
						$info = $moBoleto->getAllInformation($_GET["numBoleto"]);
						require_once("../controllers/CntrlBoardPass.php");
						
						$req = array(
							"html" => 	successConfirm(),
							"mail" =>   htmlEmail(),
							"path" =>	'http://'.$_SERVER['HTTP_HOST']."/tcpdf/pdf/".$_GET["numBoleto"].".pdf"
						);
						echo json_encode($req);
					
					}else{
						errorConfirm();
						
					}
				
			break;
		}
				
	}	


?>