<?php
class moVuelos
{
	private $query;
	
	public function getVuelos($tipo, $origen, $destino, $pasajeros, $clase, $f1, $f2)
	{
		$connection = new Connection();
		$result = array();
		
		if($tipo == "Sencillo")
		{	
			$this->query = $connection->getStatement("SELECT * FROM vuelos INNER JOIN rutas ON vuelos.rutas_idRuta = rutas.idRuta WHERE rutas.origen= '" . $origen . "' AND rutas.destino= '" . $destino . "' AND vuelos.fecha = '" . $f1 . "';");
			
			while ($registro = $this -> query -> fetch_assoc())
			{
				$this->result[] = $registro;
			}
			$this -> query -> free();
		}
		
		return $result;
	}
}
?>