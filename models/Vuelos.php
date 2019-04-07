<?php

class moVuelos
{
	private $stm;
	
	public function getVuelos($tipo, $origen, $destino, $pasajeros, $clase, $f1, $f2)
	{
		$content = "";
		$connection = new Connection();
		$this->result = array();
		
		if($tipo == "Sencillo")
		{	
			$this-> stm = $connection->getStatement("SELECT * FROM vuelos INNER JOIN rutas ON vuelos.rutas_idRuta = rutas.idRuta WHERE rutas.origen= '" . $origen . "' AND rutas.destino= '" . $destino . "' AND vuelos.fecha = '" . $f1 . "';");
		}
		
		while ($registro = $this-> stm -> fetch_assoc())
		{
			$content = $content . "<div class= 'cuadroAzul'> " . $registro['idVuelo'] . " </div>";
		}
		
		$this -> stm -> free();
		return $content;
	}
}
?>