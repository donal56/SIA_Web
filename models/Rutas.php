<?php

class moRutas
{
	private $stm;
	private $result;
	
	public function getOrigins()
	{
		$connection = new Connection();
		$this->result = array();
		$this-> stm = $connection->getStatement("SELECT origen FROM rutas GROUP BY origen"); 

		while ($row = $this-> stm -> fetch_assoc())
		{
			$this->result[] = $row ;
		}
		
		$this->stm -> free();
		return $this->result;
	}
	
	public function getDestinations()
	{
		$connection = new Connection();
		$this->result = array();
		$this-> stm = $connection->getStatement("SELECT destino FROM rutas GROUP BY destino"); 
		
		while ($row = $this-> stm -> fetch_assoc())
		{
			$this ->result[] = $row ;
		}
		
		$this->stm -> free();
		return $this->result;
	}	
}
?>