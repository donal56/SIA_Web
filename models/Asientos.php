<?php
class moAsientos
{
	public function getSeater($clase, $v)
	{
		$cad= "";
		$vip= $this -> getLastSeat("VIP", $v);
		$eje= $this -> getLastSeat("Ejecutivo", $v);
		$tur= $this -> getLastSeat("Turista", $v);
		
		$cad= <<<LABEL
			<div id="divSeat" class="wrapper" onload="  initSeater($vip, $eje , $tur , '$clase');">
				<div class="container">
					<h1>Reserve sus asientos</h1>
					<div id="seat-map">
					<div class="front-indicator">Frente</div>
				</div>
					<div id="legend"></div>
				</div>
			</div>
LABEL;
		
		return $cad;
	}
	
	public function getLastSeat($clase, $vuelo)
	{
		
		$str = <<<LABEL
			SELECT asientosAvion.asientoFin FROM vuelos INNER JOIN aviones 
			ON vuelos.aviones_idAvion = aviones.idAvion INNER JOIN asientosAvion 
			ON aviones.modelosAvion_idModelo = asientosAvion.modelosAvion_idModelo 
			WHERE vuelos.idVuelo = $vuelo AND asientosAvion.clase = '$clase';				
LABEL;
		$connection = new Connection();
		$query = $connection->getStatement($str);
		
		if($query->num_rows !== 0)
		{		
			while($row = mysqli_fetch_array($query)) 
			{
				$str = $row['asientoFin'];
			}
		}
			
		return intval($str);
	}
	
	public function getPasajeros($adult, $niñ, $beb)
	{
		$adultos= intval($adult);
		$niños= intval($niñ);
		$bebes= intval($beb);
		
		$cad= "<div class= 'bloque'><form id= 'f1'>";
		
		for ($i= 0; $i < ($adultos + $niños + $bebes); $i++)
		{	
		$cad= $cad . "<span class= 'divider'>Nombre: <input type= 'text' name= 'name'></input>Asiento: <input type= 'text' name= 'seat'></input>Fecha de Nac.<input type= 'date' name='bday' min='1930-01-01''></span>";
		}
		
		$cad = $cad . "<br><input type= 'button' onClick= \"validate();\" value= 'Continuar'></input></form></div>";
		
		return $cad;
	}
	
	public function x($id)
	{
		$str= "select noAsiento from boletos where vuelos_idvuelo = " . $id;
		
		$connection = new Connection();
		$result = array();
		$stm = $connection->getStatement($str); 

		while ($registro= $stm -> fetch_assoc())
		{
			$result[] = $registro ;
		}
		
		$stm -> free();
		return $result;
	}
}
?>