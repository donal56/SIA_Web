<?php
class moVuelos
{
	private $areAvailable= true;

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
		
		if ($this -> areAvailable)
		{
			$cad= $cad . "<button type= 'button' class= 'btnSIA' style= 'float: right; position: relative; right: 5vw; margin-bottom: 5vh' onclick= \"seleccionarAsientos('" . $tipo ."', '" . $origen ."', '" . $destino ."', '" . $adultos ."', '" . $niños ."', '" . $bebes ."', '" . $clase ."', '" . $f1 ."', '" . $f2 . "');\">Continuar &nbsp &#x25b6 </button>";
		}
		
		return "<form id= 'seleccionarVuelo'>" . $cad . "</form>";
	}
	
	
	public function printVuelos($titulo, $string, $clase, $adultos, $niños, $bebes)
	{
		
		$connection = new Connection();
		$query = $connection->getStatement($string);
		
		$cad_aux= "<div class= 'subtitle'>" . $titulo .  "</div>";
		$factor= 1.0 * intval($adultos) + 0.7 * intval($niños) + 0.5 * intval($bebes);
		
		if($query->num_rows !== 0)
		{	
				
			while($row = mysqli_fetch_array($query)) 
			{	
				$cad_aux= $cad_aux . "<div class= 'cuadro azul'></span><div class= 'subcuadro'> Vuelo <br>" . $row['idVuelo'] . "</div>"; 
				
				$cad_aux= $cad_aux . "<div class= 'subcuadro'>" . $row['origen'] . "<br>" . $row['horaSalida'] . "</div>";
				
				$cad_aux= $cad_aux . "<img class= 'subcuadro' src= 'views/img/conector.png' width= 20%>";

				$cad_aux= $cad_aux . "<div class= 'subcuadro'>" . $row['destino'] . "<br>" . $row['horaLlegada'] . "</div>";
				
				$cad_aux= $cad_aux . "<div class= 'subcuadro'><span style= 'font-size: 3.5vw; padding-bottom: 5px' title= '";
				
				if($clase == "VIP")
				{
					$cad_aux= $cad_aux . "Boleto normal: $" . intval($row['precioVIP']) . "
Boleto para niños: $" . (intval($row['precioVIP']) * 0.7) . "
Boleto para bebes: $" . (intval($row['precioVIP']) * 0.5) . "'>$" . (intval($row['precioVIP']) * $factor);
				}
				else if ($clase == "Ejecutivo")
				{
					$cad_aux= $cad_aux . "Boleto normal: $" . intval($row['precioEjecutivo']) . "
Boleto para niños: $" . (intval($row['precioEjecutivo']) * 0.7) . "
Boleto para bebes: $" . (intval($row['precioEjecutivo']) * 0.5) . "'>$" . (intval($row['precioEjecutivo']) * $factor);
				}
				else
				{
					$cad_aux= $cad_aux . "Boleto normal: $" . intval($row['precioTurista']) . "
Boleto para niños: $" . (intval($row['precioTurista']) * 0.7) . "
Boleto para bebes: $" . (intval($row['precioTurista']) * 0.5) . "'>$" . (intval($row['precioTurista']) * $factor);
				}
				
				$cad_aux= $cad_aux . "</span><br><label class= 'radioContainer'>Elegir <input type= 'radio' value= '" . $row['idVuelo'] . "' name= '" . $titulo . "'><span class= 'circle'></span></label></div></div>";
			}
		}
		else
		{
			$cad_aux = $cad_aux . "<br><br>No hay vuelos disponibles :( <br><br><img src= 'views/img/plane.png' width= 20%><br>";
			$this -> areAvailable= ($this -> areAvailable && false);
		}
		
		$query -> free();
		
		return $cad_aux;
	}
}
?>