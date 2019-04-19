<?php

class moBoletos{
	
	private $stm;

	public function isValidID($boleto){
		
		$connection = new Connection();
		$this-> stm = $connection->getStatement("SELECT idBoleto FROM boletos WHERE idBoleto = '".$boleto."'");
		if ($this-> stm ->num_rows != null) {
			return true;
			$this->stm -> free();
		}
		else {
			return false;
		}
		
	}
	
	
}

?>