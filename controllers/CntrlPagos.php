<?php
	//call model
	require_once("../models/database.php");
	require_once("../models/Pagos.php");
	
	$p = new moPagos();

	if(!$_GET){
		
	echo <<<EOT
	

	
EOT;

	}

?>


<div>	
	<table>
		<caption><h2> Detalles de compra </h2></caption>
		<tr>
			<th><span class="trn" >Vuelos</span></th>
			<th><span class="trn" >Precio</span></th>
			<th><span class="trn" >Desglose</span></th>
			<th><span class="trn" >Precio</span></th>
		</tr>
		<tr>
			<td><span class="trn">Adultos</span></td>
			<td>Celda 1</td>
			<td><span class="trn">Precio Base</span></td>
			<td>Celda 1</td>
		</tr>
		<tr>
			<td><span class="trn">Menores</span></td>
			<td>Celda 2</td>
			<td><span class="trn">IVA 16%</span></td>
			<td>Celda 1</td>
		</tr>
		<tr>
			<td><span class="trn">Bebes</span></td>
			<td>Celda 3</td>
			<td></td>
			<td>Celda 1</td>
		</tr>
		
		<tfoot>
				<tr>
					<td colspan="3"><span class="trn">Total a pagar</span></td>
					<td>Celda 4</td>
				</tr>

		</tfoot>
		
		</table>
		<br>
		<button class="btnSIA">Pagar</button>

</div>