<?php
	//call model
	require_once("../models/database.php");
	require_once("../models/Pagos.php");
	
	$pago = new moPagos();

	if($_GET){
	
		$price = $pago -> getPrice($_GET['v1'],$_GET['clase'])[0][0];
		$priceA = $_GET['cantAdult']*$price;
		$priceK = $_GET['cantKid']*$price*.75;
		$priceB = $_GET['cantBaby']*$price*.5;
		$total = $priceA+$priceK+$priceB;
		$iva = $total*.16;
		$base= $total-$iva;
		
	
	echo <<<EOT
	
	<div id="details" style="text-align: center; font-size:calc(10px + .5vw);">	
	<table style="margin: 0 auto;" width="70%" bordercolor="#B8B8B8" cellspacing="5" cellpadding="5">
		<caption><h2> Detalles de compra </h2></caption>
		<tr>
			<th><span class="trn" >Vuelos</span></th>
			<th><span class="trn" >Precio</span></th>
			<th><span class="trn" >Desglose</span></th>
			<th  syle="border-bottom: 1px solid #ddd;"><span class="trn" >Precio</span></th>
		</tr>
		<tr>
			<td><span class="trn">{$_GET['cantAdult']} Adultos</span></td>
			<td>$ $priceA </td>
			<td><span class="trn">Precio Base</span></td>
			<td>$ $base</td>
		</tr>
		<tr>
			<td><span class="trn">{$_GET['cantKid']} Menores</span></td>
			<td>$ $priceK </td>
			<td><span class="trn">IVA 16%</span></td>
			<td>$ $iva</td>
		</tr>
		<tr>
			<td><span class="trn">{$_GET['cantBaby']} Bebes</span></td>
			<td>$ $priceB </td>
			<td></td>
			<td></td>
		</tr>
		
		<tr style="font-weight: bolder; font-size:calc(12px + .7vw);">
			<td colspan="3" align="right"><span class="trn">Total a pagar:</span></td>
			<td>$ {$total}</td>
		</tr>
		
		</table>
	
		<br><button style="align-self: center" class="btnSIA"><span class="trn">Pagar</span></button>

	</div>

	
EOT;

	}

?>
