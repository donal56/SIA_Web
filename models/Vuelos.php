<?php
class moVuelos
{
	public function getVuelos($tipo, $origen, $destino, $adultos, $niños, $bebes, $clase, $f1, $f2)
	{
		$cad = "";
	
		$str = <<<LABEL
			SELECT * FROM vuelos INNER JOIN rutas ON vuelos.rutas_idRuta = rutas.idRuta WHERE rutas.origen='$origen' AND rutas.destino='$destino' AND vuelos.fecha ='$f1' AND rutas.estado= 1;				
LABEL;
			
		$cad= $cad . $this -> printVuelos("Ida", $str, $clase, $adultos, $niños, $bebes);
			
		if($tipo == "Redondo")
		{
			$str = <<<LABEL
			SELECT * FROM vuelos INNER JOIN rutas ON vuelos.rutas_idRuta = rutas.idRuta WHERE rutas.origen='$destino' AND rutas.destino='$origen' AND vuelos.fecha ='$f2' AND rutas.estado= 1;				
LABEL;
			
			$cad= $cad . $this -> printVuelos("Regreso", $str, $clase, $adultos, $niños, $bebes);
		}
			
		
		return $cad;
	}
	
	
	public function printVuelos($titulo, $string, $clase, $adultos, $niños, $bebes)
	{
		
		$connection = new Connection();
		$query = $connection->getStatement($string);
		
		$cad_aux= "<div class= 'subtitle'>" . $titulo .  "</div>";
		
		if($query->num_rows !== 0)
		{	
				
			while($row = mysqli_fetch_array($query)) 
			{	
				$cad_aux= $cad_aux . "<div class= 'cuadro azul'></span><div class= 'subcuadro'> Vuelo <br>" . $row['idVuelo'] . "</div>"; 
				
				$cad_aux= $cad_aux . "<div class= 'subcuadro'>" . $row['origen'] . "<br>" . $row['horaSalida'] . "</div>";
				
				$cad_aux= $cad_aux . "<img class= 'subcuadro' src= 'views/img/conector.png' width= 20%>";

				$cad_aux= $cad_aux . "<div class= 'subcuadro'>" . $row['destino'] . "<br>" . $row['horaLlegada'] . "</div>";
				
				$cad_aux= $cad_aux . "<div class= 'subcuadro'><span style= 'font-size: 3.5vw; padding-bottom: 5px'>$";
				
				if($clase == "VIP")
				{
					$cad_aux= $cad_aux . $row['precioVIP'];
				}
				else if ($clase == "Ejecutivo")
				{
					$cad_aux= $cad_aux . $row['precioEjecutivo'];
				}
				else
				{
					$cad_aux= $cad_aux . $row['precioTurista'];
				}
				
				$cad_aux= $cad_aux . "</span><br><label class= 'radioContainer'>Elegir <input type= 'radio' value= '" . $row['idVuelo'] . "' name= '" . $titulo . "' required><span class= 'circle'></span></label></div></div>";
			}
		}
		else
		{
			$cad_aux = $cad_aux . "<br><br>No hay vuelos disponibles :( <br><br><img src= 'views/img/plane.png' width= 20%><br>";
		}
		
		$query -> free();
		
		return $cad_aux;
	}
}
?>