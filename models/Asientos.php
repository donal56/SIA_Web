<?php
class moAsientos
{
	public function getAsientos($tipo, $origen, $destino, $adultos, $niños, $bebes, $clase, $f1, $f2, $v1, $v2)
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
		
		$cad= $cad . "<button type= 'button' class= 'btnSIA' style= 'float: right; position: relative; right: 5vw; margin-bottom: 5vh' onclick= 'seleccionarAsientos('" . $tipo ."', '" . $origen ."', '" . $destino ."', '" . $adultos ."', '" . $niños ."', '" . $bebes ."', '" . $clase ."', '" . $f1 ."', '" . $f2 . "');'>Continuar &nbsp &#x25b6 </button>";
		
		return $cad;
	}
}
?>