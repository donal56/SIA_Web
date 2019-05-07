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
					<h1><span class= "trn">Reserve sus asientos</span> (<span class= "trn">$clase</span>)</h1>
					<div id="seat-map">
					<div class="front-indicator"><span class= "trn">Frente</span></div>
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
		$cad= $cad . "<span class= 'divider'><span class= 'trn'>Nombre</span>: <input type= 'text' name= 'name" . $i . "'></input><span class= 'trn'>Asiento</span>: <input type= 'text' name= 'seat" . $i . "'></input><span class= 'trn'>Fecha de Nac.</span><input id= 'bday' type= 'text' name= 'bday" . $i . "></span>";
		}
		
		$cad = $cad . "<br><input type= 'button' onClick= \"validate();\"><span class= 'trn'>Continuar</span></input></form></div>";
		
		return $cad;
	}
	
	public function x($id)
	{
		$str= "select noAsiento from boletos where vuelos_idvuelo = " . $id . " and status= 1";
		
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