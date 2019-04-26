function seleccionarAsientos(tipo, origen, destino, adultos, niños, bebes, clase, f1, f2)
{
	'use strict';
	
	var vuelo1 = $('input[name="Ida"]:checked', '#seleccionarVuelo').val(); 
	var vuelo2 = $('input[name="Regreso"]:checked', '#seleccionarVuelo').val(); 
	// if they dont exist then
	solicitar("views/Asientos.phtml");
	
	$.ajax(
	{
		method: 'GET',
		url: 'controllers/CntrlAsientos.php',
		data: 	{ 
					tipo : tipo,
					ori : origen, 
					des : destino,
					pas1 : adultos,
					pas2 : niños,
					pas3 : bebes,
					clase : clase, 
					f1 : f1, 
					f2 : f2,
					v1 : vuelo1,
					v2 : vuelo2
				},
		success: function(response) 
		{
		   document.getElementById("seleccionDeAsientos").innerHTML= response;
		},
		error: function(xhr, status, error)
		{
		   document.getElementById("seleccionDeAsientos").innerHTML= xhr.responseText;
		}
	});
}