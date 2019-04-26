<?php
class moAsientos
{
	public function getAsientos($tipo, $origen, $destino, $adultos, $niños, $bebes, $clase, $f1, $f2, $v1, $v2)
	{
		$cad = "";
	
		$str = <<<LABEL
			SELECT asientosAvion.asientoInicio, asientosAvion.asientoFin FROM vuelos INNER JOIN aviones 
			ON vuelos.aviones_idAvion = aviones.idAvion INNER JOIN asientosAvion 
			ON aviones.modelosAvion_idModelo = asientosAvion.modelosAvion_idModelo 
			WHERE vuelos.idVuelo = $v1 AND asientosAvion.clase = '$clase';				
LABEL;
		$connection = new Connection();
		$query = $connection->getStatement($str);
		
		if($query->num_rows !== 0)
		{			
			while($row = mysqli_fetch_array($query)) 
			{
				$cad= $cad . "<script> initSeater(" . $row['asientosAvion.asientoInicio'] . ", " . $row['asientosAvion.asientoFin'] . ", " . totalSeats($v1) . ", '" . $clase ."'); </script>"
				
			}
		}
		else
		{
			$cad= "Error al recuperar los asientos disponibles";
		}
			
		return $cad;
	}
	
	public function totalSeats($vuelo)
	{
		$totalSeats= 0;
		
		$str = <<<LABEL
			SELECT max(asientosAvion.asientoFin) as total FROM vuelos INNER JOIN aviones 
			ON vuelos.aviones_idAvion = aviones.idAvion INNER JOIN asientosAvion 
			ON aviones.modelosAvion_idModelo = asientosAvion.modelosAvion_idModelo 
			WHERE vuelos.idVuelo = $vuelo;				
LABEL;
		$connection = new Connection();
		$query = $connection->getStatement($str);
				
		while($row = mysqli_fetch_array($query)) 
		{
			$totalSeats = $row['total'];
		}
		
		return $totalSeats;
	}
}
?>