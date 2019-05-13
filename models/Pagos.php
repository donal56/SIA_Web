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
	
	public function registerPax($pat,$mat,$name,$nac){
		$connection = new Connection();
		
		return $connection->getStatementID("INSERT INTO clientes (apellidoP,apellidoM,nombre,fechaNC) VALUES ('$pat','$mat','$name','$nac');");
	}
	
	public function registerTicket($id,$asiento,$cliente,$vuelo){
		$connection = new Connection();
		
		if ($connection->getStatement("INSERT INTO boletos (idBoleto,noAsiento,status,clientes_idCliente,vuelos_idvuelo) VALUES ('$id','$asiento',0,'$cliente','$vuelo');")) {
			return true;
		}
		else {
			return false;
		}
	}
	
}

?>