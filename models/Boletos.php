<?php

class moBoletos{
	
	private $stm;
	private $result;
	

	public function isValidID($boleto){
		
		$connection = new Connection();
		$this-> stm = $connection->getStatement("SELECT idBoleto FROM boletos 
												WHERE idBoleto = '$boleto' ");
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
	
	
	public function getAllInformation($boleto){
		$connection = new Connection();
		$this->result = array();
		
		$que= <<<EOT
		
SELECT 	idBoleto,
		idVuelo,
		noAsiento,
        concat(nombre, " ", apellidoP, " ", apellidoM) AS pasajero,
        fecha,
        horaSalida,
        origen,
        destino 
FROM boletos b
INNER JOIN clientes c
INNER JOIN vuelos v
INNER JOIN rutas r
INNER JOIN aviones a
INNER JOIN asientosAvion aa
ON 	b.clientes_idCliente = c.idCliente AND
	b.vuelos_idVuelo = v.idVuelo AND  
    v.rutas_idRuta = r.idRuta AND 
    v.aviones_idAvion = a.idAvion AND
    a.modelosAvion_idModelo = aa.modelosAvion_idModelo AND
    b.noAsiento BETWEEN aa.asientoInicio AND aa.asientoFin
WHERE idBoleto = '$boleto'

EOT;
		$this-> stm = $connection->getStatement($que);
		
		while ($row = $this-> stm -> fetch_assoc()){
			$this->result[] = $row ;
		}
		
		$this->stm -> free();
		return $this->result;
	}
	
}

?>