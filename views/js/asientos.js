var firstSeatLabel= 1;
var mapa = [];
var aux= "";

$(function()
{
    $('.bloque').ready(initSeatCalendars());
});

function initSeatCalendars()
{
	'use strict';
	calendar = new dhtmlXCalendarObject(["bday"]);
	calendar.hideTime();
}

function initSeater(vip, ejecutivo, turista, clase)
{	
	 $(document).ready(function() 
	 {
		'use strict';

		rellenarMapa(1, vip, "v");
		rellenarMapa(vip + 1, ejecutivo, "e");
		rellenarMapa(ejecutivo + 1, turista, "t");
		
		var sc = $('#seat-map').seatCharts({
			map: mapa,
			seats: {
				v: {
					classes : 'first-class', //your custom CSS class
					category: translator.get('VIP')
				},
				e: {
					classes : 'second-class', //your custom CSS class
					category: translator.get('Ejecutivo')
				},					
				t: {
					classes : 'economy-class', //your custom CSS class
					category: translator.get('Turista')
				}
			},
			naming : {
				top : false,
				getLabel : function (character, row, column) 
				{
					return (column => 3 ? ++firstSeatLabel : firstSeatLabel++);
				},
				getId  : function(character, row, column) 
				{
						return (((row > 0) ? 6 * (row - 1) : 0 ) + column);
				}
			},
			legend : 
			{
				node : $('#legend'),
				items : [
					[ 'v', (clase != 'VIP') ? 'unavailable' : 'available',   translator.get('VIP') ],
					[ 'e', (clase != 'Ejecutivo') ? 'unavailable' : 'available',   translator.get('Ejecutivo')],
					[ 't', (clase != 'Turista') ? 'unavailable' : 'available',   translator.get('Turista')],
					[ 'f', 'unavailable', 'Reservado']
					// [ 'v', 'available',   'VIP' ],
					// [ 'e', 'available',   'Ejecutivo'],
					// [ 't', 'available',   'Turista'],
					// [ 'f', 'unavailable', 'Reservado']
				]					
			},
			click   : function() 
			{
				console.log(this);
			},
			blur   : function() 
			{
				console.log(this);
			},
			focus   : function() 
			{
				console.log(this);
			}});

		sc.get(['12', '41', '7', '32']).status('unavailable');
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