<?php
class moVuelos
{
	public function getVuelos($tipo, $origen, $destino, $adultos, $niños, $bebes, $clase, $f1, $f2)
	{
		$cad = "";
		$connection = new Connection();

		if($tipo == "Sencillo")
		{	
			$str = <<<LABEL
			SELECT * FROM vuelos INNER JOIN rutas ON vuelos.rutas_idRuta = rutas.idRuta WHERE rutas.origen='$origen' AND rutas.destino='$destino' AND vuelos.fecha ='$f1';				
LABEL;
			$query = $connection->getStatement($str);
			
			if($query->num_rows !== 0)
			{
				$cad= "<div class= 'subtitle'> Ida </div>";
				while($row = mysqli_fetch_array($query)) 
				{
					$cad= $cad . "<div class= 'cuadro azul'> Vuelo " . $row['idVuelo'] . " Origen " . $row['horaSalida'] . "<img src= 'views/img/conector.png' width= 20%>" . " Destino " . $row['horaLlegada'];
					
					if($clase == "VIP")
					{
						$cad= $cad . " " . $row['precioVIP'];
					}
					else if ($clase == "Ejecutivo")
					{
						$cad= $cad . " " . $row['precioEjecutivo'];
					}
					else
					{
						$cad= $cad . " " . $row['precioTurista'];
					}
					
					$cad= $cad . "<input type= 'button' value= 'Elegir'></input> </div>";
				}
			}
			else
			{
				$cad = "No hay vuelos disponibles :( <br><br><img src= 'views/img/plane.png' width= 20%><br>";
			}

			$query -> free();
			
		}
		return $cad;
	}
}
?>