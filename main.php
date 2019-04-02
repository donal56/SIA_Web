<!doctype html>
<html>
	
<body>
	
		<link rel="stylesheet"  type="text/css" href="css/carousel.css">
		<script src="js/carousel.js"></script>
		
		<script src="js/main.js"></script>
		
		
	<div id="srchForm">
		<form action="/my-handling-form-page" method="post" id= "formOptions">
			 <label for="opTipo">
				 Tipo
				<br><select name="tipo" >
					<option value="Sencillo">Sencillo</option>
					<option value="Redondo">Redondo</option>			
					</select>

			 </label>

			  <label for="opOrigen">
				 Origen
				 <br><select name="opOrigen" >
					<?php
				  		$query = $conexion -> query ("SELECT * FROM rutas");
          				while ($valores = mysqli_fetch_array($query)) {
						echo '<option value="'.$valores['idRuta'].'">'.$valores['origen'].'</option>';
						}
				  	?>		
					</select>
					
			 </label>

			  <label for="opDestino">
				 Destino 
				 <br><input type="text" id="opDestino" > 
			 </label>

			  <label for="opPasajeros">
				 Pasajeros
				 <br><input type="text" id="opPasajeros" onclick="showPass(this);" onFocus="hidePass();"  > 
			 </label>

			  <label for="opClase">
				 Clase
				 <br><select name="opClase" >
					<option value="vip">Vip</option>
					<option value="Ejecutivo">Ejecutivo</option>		
					<option value="Turista">Turista</option>		
					</select>

			 </label>

			  <label for="opFechaSal">
				 Fecha de Salida
				 <br><input type="text" id="opFechaSal" > 
			 </label>

			  <label for="opFechaReg">
				 Fecha de Regreso
				 <br><input type="text" id="opFechaReg" > 
			 </label>

		</form>

		<button type="button" form="flyOptions" class="btnSearch">Buscar Vuelos &nbsp;&nbsp;&#x25b6;</button>
		
	</div>
	<p class="bigText">¡Descubre!</p>
	<div id="wrapper_bu">
		<div id="bu1"><p class="txt_Center txt_h1">1</p></div>
		<div id="bu2"><p class="txt_Center txt_h1">2</p></div>
		<div id="bu3"><p class="txt_Center txt_h1">3</p></div>
		<div id="bu4"><p class="txt_Center txt_h1">4</p></div>
		<div id="bu5"><p class="txt_Center txt_h1">5</p></div>
		
		
			
	</div>

</body>

<script>
	initCalendar();
	passCount();
</script>



</html>