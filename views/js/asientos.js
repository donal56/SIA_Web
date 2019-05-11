var firstSeatLabel= 1;
var mapa = [];
var aux= "";
var arrP;
var sc;

function initSeatCalendars()
{
	'use strict';
	var elements= Number(document.forms["f1"].getElementsByTagName("input").length);
	for (var n= 0; n < elements; n++)
	{
		new dhtmlXCalendarObject("bday" + n).hideTime();
	}
}

function initSeater(vip, ejecutivo, turista, clase, arr)
{	
	'use strict';
	var a= new Array();
	
	for(var i= 0; i < arr.length; i++)
	{
		a[i]= arr[i];
	}
	
	 $(document).ready(function() 
	 {
		'use strict';

		rellenarMapa(1, vip, "v");
		rellenarMapa(vip + 1, ejecutivo, "e");
		rellenarMapa(ejecutivo + 1, turista, "t");
		
		sc = $('#seat-map').seatCharts({
			map: mapa,
			seats: {
				v: {
					classes : (clase != 'VIP') ? 'unavailableV' : 'first-class', //your custom CSS class
					category: translator.get('VIP')
				},
				e: {
					classes : (clase != 'Ejecutivo') ? 'unavailableE' : 'second-class', //your custom CSS class
					category: translator.get('Ejecutivo')
				},					
				t: {
					classes : (clase != 'Turista') ? 'unavailableT' : 'economy-class', //your custom CSS class
					category: translator.get('Turista')
				}
			},
			naming : {
				top : false,
				getLabel : function (character, row, column) 
				{
					return firstSeatLabel++;
				},
				getId  : function(character, row, column) 
				{
					return firstSeatLabel;
				}
			},
			legend : 
			{
				node : $('#legend'),
				items : [
					[ 'v', (clase != 'VIP') ? 'unavailableV' : 'available',   'VIP' ],
					[ 'e', (clase != 'Ejecutivo') ? 'unavailableE' : 'available',   'Ejecutivo'],
					[ 't', (clase != 'Turista') ? 'unavailableT' : 'available',   'Turista'],
					[ 'f', 'unavailable', translator.get('Reservado')]
					// [ 'v', 'available',   'VIP' ],
					// [ 'e', 'available',   'Ejecutivo'],
					// [ 't', 'available',   'Turista'],
					// [ 'f', 'unavailable', 'Reservado']
				]					
			},
			click   : function() 
			{
				console.log(this);
				return this.style();
			},
			blur   : function() 
			{
				return this.style();
			},
			focus   : function() 
			{
				return this.style();
			}});

		$("div.seatCharts-seat").css({ 'background-color' : '', 'opacity' : '' });
		sc.get(a).status('unavailable');
	});
}

function rellenarMapa(start, end, symbol)
{	
	'use strict';
	
	for(var i= start; i <= end; i++)
	{
		(i%3==0 && i%6!=0) ? aux+= symbol + "_" : aux+= symbol;
		
		if (i%6==0)
		{
			mapa.push(aux);
			aux= "";
		}
	}
}

function procederAlPago(tipo, origen, destino, adultos, niños, bebes, clase, f1, f2, v1, v2)
{
	if(!formEmpty("#f1"))
	{
		if (makesSense(adultos, niños, bebes, clase))
		{		
			$.ajax(
			{
				method: 'GET',
				url: 'controllers/CntrlPagos.php',
				data: 	{ 
							tipo : tipo,
							cantAdult : adultos,
							cantKid : niños,
							cantBaby : bebes,
							clase : clase, 
							f1 : f1, 
							f2 : f2,
							v1 : v1,
							v2 : v2
							//pasajeros: arrP
						},
				success: function(response) 
				{
				   document.getElementById("content").innerHTML = response;

				},
				error: function(xhr, status, error)
				{
				   document.getElementById("content").innerHTML="Error";
				}
			});
		}
		else
		{
			msgAlert(translator.get('Error'),"<span style= ''>" + translator.get("Por favor, revise que los datos sean correctos") + "<br>" + translator.get("Revise que haya elegido asientos disponibles de su clase y que las fechas de nacimiento sean correctas a la categoría de edad") + "." + "</span>");
		}
	}
	else
	{
		msgAlert(translator.get('Error'),translator.get("Por favor, ingrese todos los datos"));
	}	
}

function makesSense(adultos, niños, bebes, clase)
{
	'use strict';
	
	var elements = document.forms["f1"].getElementsByTagName("input");
	var arrP= new Array(adultos + niños + bebes);
	var isOK= true;
	var ac= 0, nc= 0, bc= 0;
	
	for (var k= 0; k < (adultos + niños + bebes); k++)
	{
		var n = elements[k*3].value;
		var s = elements[k*3+1].value;
		var b = elements[k*3+2].value;
	
		if(sc.get(s).status() !== 'available' || typeof sc.get(s) === "undefined" || sc.get(s).settings.data.category !== clase)
		{
			isOK= false;
			console.log("Fallo en el asiento " + s);
			continue;
		}	
		
		var bd= Number(edad(new Date(b)));
		if (bd >= 16)
		{
			ac++;
		}
		else if(bd >= 3 && bd < 16)
		{
			nc++;
		}
		else if (bd < 3)
		{
			bc++;
		}
		
		var y= [n, s, b];
		arrP[k]= y;
	}
	
	if(ac !== adultos || nc !== niños || bc !== bebes)
	{
		isOK= false;
		console.log("Fallo en las edades(" + ac + " " + nc + " " + bc +")");
	}
	
	return isOK;
}

function edad(bd) 
{
    var ageDifMs = Date.now() - bd.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}