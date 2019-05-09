<?php
class moAsientos
{
	public function getSeater($clase, $v)
	{
		$cad= "";
		$vip= $this -> getLastSeat("VIP", $v);
		$eje= $this -> getLastSeat("Ejecutivo", $v);
		$tur= $this -> getLastSeat("Turista", $v);
		$arr= json_encode($this -> getBookedSeats($v));
		
		$cad= <<<LABEL
		<div id='divSeat' class= 'wrapper' onload= 'initSeater($vip, $eje, $tur, "$clase", $arr)'>
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
	
	public function getPasajeros($tipo, $origen, $destino, $adult, $niñ, $beb, $clase, $f1, $f2, $v1, $v2, $payment)
	{
		$adultos= intval($adult);
		$niños= intval($niñ);
		$bebes= intval($beb);
		
		$cad= "<div class= 'bloque'><form id= 'f1' onload='initSeatCalendars()'>";
		
		for ($i= 0; $i < ($adultos + $niños + $bebes); $i++)
		{	
		$cad= $cad . "<span class= 'divider'><span class= 'trn'>Nombre</span>: <input type= 'text' name= 'name" . $i . "'></input><span class= 'trn'>Asiento</span>: <input type= 'text' name= 'seat" . $i . "'></input><span class= 'trn'>Fecha de Nac.</span><input id= 'bday" . $i . "' type= 'text' name= 'bday" . $i . "'></input></span>";
		}
		
		if($payment)
		{
			$cad = $cad . <<<LABEL
			<br><button type= 'button' class= 'btnSIA' style= 'padding-bottom: 10px' onclick= "procederAlPago('$tipo', '$origen', '$destino', $pas1, $pas2, $pas3, '$clase', '$f1', '$f2', $v1, $v2)"><span class= 'trn'>Continuar</span></input></form></div>
LABEL;
		}
		else
		{
			// do again
			$cad = $cad . <<<LABEL
			<br><button type= 'button' class= 'btnSIA' style= 'padding-bottom: 10px' onclick= "procederAlPago('$tipo', '$origen', '$destino', $adultos, $niños, $bebes, '$clase', '$f1', '$f2', $v1, $v2)"><span class= 'trn'>Continuar</span></button></form></div>
LABEL;
		}
		
		return $cad;
	}
	
	public function getBookedSeats($id)
	{
		$str= "select noAsiento from boletos where vuelos_idvuelo = " . $id;
		
		$result = array(); 
		$connection = new Connection();
		$stm = $connection->getStatement($str);
		
		for($j= 0; $j < $stm->num_rows; $j++)
		{		
			$row = mysqli_fetch_array($stm);
			$result[$j]=  $row['noAsiento'];
		}

		return $result;
	}
}
?>