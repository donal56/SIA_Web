<?php
class moPagos
{
	public function getPrice($id,$class){
	
		$connection = new Connection();
		$this->result = array();

		$this-> stm = $connection->getStatement("SELECT precio$class FROM vuelos where idVuelo = $id");

			while ($row = $this-> stm -> fetch_row()){
				$this->result[] = $row ;
			}

			$this->stm -> free();
			return $this->result;
		}
	
}

?>