<?php
class moVuelos
{
	private $query;
	private $result;
	
	public function getVuelos($tipo, $origen, $destino, $pasajeros, $clase, $f1, $f2)
	{
		$connection = new Connection();
		$this->result = array();
		
		if($tipo == "Sencillo")
		{	
$bar = <<<LABEL
SELECT * FROM vuelos INNER JOIN rutas ON vuelos.rutas_idRuta = rutas.idRuta WHERE rutas.origen='$origen' AND rutas.destino='$destino' AND vuelos.fecha ='$f1';				
LABEL;
			$this->query = $connection->getStatement($bar);
			
			while ($registro = $this -> query -> fetch_assoc())
			{
				$this->result[] = $registro;
			}
			$this -> query -> free();
		}
		
		return $this->result;
	}
}
?>