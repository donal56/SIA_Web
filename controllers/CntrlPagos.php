<?php
session_save_path("../sessions"); 
ini_set('session.gc_probability', 1);
session_start();
	//call model
	require_once("../models/database.php");
	require_once("../models/Pagos.php");
	
	$pago = new moPagos();

	if($_GET){
		$_SESSION['idFly'] = $_GET['v1'];
		$_SESSION['cantAdult'] = $_GET['cantAdult'];
		$_SESSION['cantKid'] = $_GET['cantKid'];
		$_SESSION['cantBaby'] = $_GET['cantBaby'];
		
		$price = $pago -> getPrice($_GET['v1'],$_GET['clase'])[0][0];
		
		$_SESSION['priceA'] = $priceA = $_GET['cantAdult']*$price;
		$_SESSION['priceK'] = $priceK = $_GET['cantKid']*$price*.75;
		$_SESSION['priceB'] = $priceB = $_GET['cantBaby']*$price*.5;
		$_SESSION['totalPrice'] = $total = $priceA+$priceK+$priceB;
		$iva = $total*.16;
		$base= $total-$iva;
		
	
	echo <<<EOT
	<script type= "text/javascript" src= "views/js/payment.js"> </script>
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
			<td><span class="trn">impuesto</span></td>
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
			<td id="total">$ {$total}</td>
		</tr>
		
		</table>
	
		<br><button style="align-self: center" class="btnSIA" onclick="msgHTML('Pagos','views/Payment.phtml');"><span class="trn">Pagar</span>&nbsp; ▶</button>

	</div>
	
EOT;

	}

if($_POST){
	
	if(!isset($_POST['print'])){
		require_once("../views/Templates.phtml");

		$vuelo = $_POST['idFly'];
		$arrP= $_SESSION['arrP'] = json_decode($_POST['arrP']);

		foreach ($arrP as $pax) {
			$fullname=explode(" ", $pax[0]);
			$mat = array_pop($fullname);
			$pat = array_pop($fullname);
			$name = implode(" ", $fullname);

			//Register clientes
			$cliente = $pago -> registerPax($pat,$mat,$name,$pax[2]);

			$id = strtoupper("N".dechex($vuelo+$cliente));
			//Register ticket
			$pago -> registerTicket($id,$pax[1],$cliente,$vuelo);

		}

		echo payTicket();
		
	}else{
		if($_POST['print']=="web"){
			$modal ="Sencillo";
			$cantAdult=$_SESSION['cantAdult'];
			$cantKid=$_SESSION['cantKid'];
			$cantBaby=$_SESSION['cantBaby'];
			$priceAdult=$_SESSION['priceA'];
			$priceKid=$_SESSION['priceK'];
			$priceBaby=$_SESSION['priceB'];
			$totalPrice=$_SESSION['totalPrice'];
			
			$idVuelo=$_POST['idFly'];
			
			$origen="Villahermosa";
			$destino="Cancun";
			$fecha="2019-08-12";
			$HoraS="18:00";
			$HoraL="12:00";
			$modelo="nose";

			
			$tname="yo mero";
			$tlast;
			$tnac;
			$ttel;

			$arrAdul;
			$arrKid;
			$arrBaby;
			$idCliente;

	
			$tipoCC="tet";
			$CC="xxxxx";
			$paydate="test";

		}else{
			//desktop
		}
		
		require_once("../controllers/CntrlTicketPDF.php");
	}
		
}

?>
