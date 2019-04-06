<?php

class moRutas{
	private static $stm;
	private $result;
	
	public function getOrigins(){
		$this->result = array();
		$this-> stm = Connection::getStatement("SELECT origen FROM rutas GROUP BY origen"); 

		while ($row = $this-> stm -> fetch_assoc()){
			$this->result[] = $row ;
		
		}
		
		$this->stm -> free();
		return $this->result;
	}
	
	public function getDestinations(){
		$this->result = array();
		$this-> stm = Connection::getStatement("SELECT destino FROM rutas GROUP BY destino"); 
		
		while ($row = $this-> stm -> fetch_assoc()){
			$this ->result[] = $row ;
			
		}
		
		$this->stm -> free();
		return $this->result;
	}
	
	
}


?>