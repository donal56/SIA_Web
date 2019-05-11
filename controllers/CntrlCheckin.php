<?php
	//call model
	require_once("../models/database.php");
	require_once("../models/Boletos.php");
	$moBoleto = new moBoletos();

	if(!$_REQUEST){
		//call view
		require_once("../views/Checkin.phtml");
		
	}else{ 
		//call view
		require_once("../views/Templates.phtml");
		
		switch ($_REQUEST["func"]) {
			case 0:

					if($moBoleto->isValidID($_GET["numBoleto"])){
						ticketChecked();

					}else{
						ticketError();			
					}

			break;

			case 1:
				
					if($moBoleto->confirmID($_REQUEST["numBoleto"])){
						$info = $moBoleto->getAllInformation($_REQUEST["numBoleto"]);
						require_once("../controllers/CntrlBoardPass.php");
						
						if(!$_POST){
							$req = array(
								"html" => 	successConfirm(),
								"mail" =>   htmlEmail(),
								"path" =>	'http://'.$_SERVER['HTTP_HOST']."/tcpdf/pdf/".$_GET["numBoleto"].".pdf"
							);
							echo json_encode($req);
						}else{
							echo "send to desktop";
						}
						
					}else{
						errorConfirm();
						
					}
				
			break;
		}
				
	}	


?>