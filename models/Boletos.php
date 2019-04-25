<?php

class moBoletos{
	
	private $stm;

	public function isValidID($boleto,$email){
		
		$connection = new Connection();
		$this-> stm = $connection->getStatement("SELECT idBoleto, email FROM boletos 
												LEFT JOIN clientes ON clientes_idCliente = idCliente 
												WHERE idBoleto = '$boleto' and email = '$email'");
		if ($this-> stm ->num_rows != null) {
			return true;
			$this->stm -> free();
		}
		else {
			return false;
		}
		
	}
	
	public function confirmID($boleto){
		$connection = new Connection();
		
		if ($connection->getStatement("UPDATE boletos SET status = 1 WHERE idBoleto = '$boleto'")) {
			return true;
		}
		else {
			return false;
		}
		
	}
	
}

?>