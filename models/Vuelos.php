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
			$str = <<<LABEL
			SELECT * FROM vuelos INNER JOIN rutas ON vuelos.rutas_idRuta = rutas.idRuta WHERE rutas.origen='$origen' AND rutas.destino='$destino' AND vuelos.fecha ='$f1';				
LABEL;
			$otro= "";
		
			$this->query = $connection->getStatement($str);
			
			while ($registro = $this -> query -> fetch_assoc())
			{
				$this->result[] = $registro;
			}
			$this -> query -> free();
			
			if(!empty($content))
			{
				foreach( $content as $vuelo)
				{
					$otro = $otro . "<div class= 'cuadroAzul'>" . $vuelo[0] . "</div>"."\n";
				}
			}
			else
			{
				echo "<div class= 'messageCentered'><br> No hay vuelos disponibles :( <br><br><img src= 'views/img/plane.png' width= 20%></div><br>";
			}	
		}
		return $otro;
	}
}
?>