var adult = 0;
var kid = 0;
var baby = 0;
var myPop;
var calendar;

$(function()
{
	'use strict';
    $('#srchForm').ready(initCalendar());
});

function recuperarVuelos()
{
	
	solicitar("views/Vuelos.phtml");
	
	$.ajax(
	{
		method: 'GET',
		url: 'controllers/CntrlVuelo.php',
		data: 	{ 
					tipo : $('#tipo').val(), 
					ori : $('#origen').val(), 
					des : $('#destino').val(),
					pas1 : adult,
					pas2 : kid,
					pas3 : baby,
					clase : $('#clase').val(), 
					f1 : $('#opFechaSal').val(), 
					f2 : $('#opFechaReg').val() 
				},
		success: function(response) 
		{
		   document.getElementById("vuelosDisponibles").innerHTML= response;
		},
		error: function(xhr, status, error)
		{
		   document.getElementById("vuelosDisponibles").innerHTML= xhr.responseText;
		}
	});
}

function initCalendar()
{
	'use strict';
	calendar = new dhtmlXCalendarObject(["opFechaSal","opFechaReg"]);
	calendar.hideTime();
}

function showPass(inp) 
{
	'use strict';
	if (!myPop) 
	{
		myPop = new dhtmlXPopup();
		myPop.attachObject("pax");
		passCount();
		
	}
	if (myPop.isVisible()) 
	{
		myPop.hide();
	} 
	else 
	{
		var x = window.dhx4.absLeft(inp);
		var y = window.dhx4.absTop(inp);
		var w = inp.offsetWidth;
		var h = inp.offsetHeight;
		myPop.show(x,y,w,h);
	}
}
		
function hidePass() 
{
	'use strict';
	if (myPop) 
	{
		myPop.hide();
	}
}

function passCount()
{
	'use strict';
	$("button[name='radButton']").click(function() 
	{
		switch(this.id)
		{
			 case "addAdult":
   				adult++;
    			break;
				
			case "subAdult":
   				if(adult > 0)
				{	
					adult--;
				}
    			break;
				
			case "addKid":
   				kid++;
    			break;
			case "subKid":
				if(kid > 0)
				{
					kid--;
				}
    			break;
				
			case "addBaby":
   				baby++;
    			break;
			
			case "subBaby":
   				if(baby > 0)
				{
					baby--;
				}
    			break;
		}
      
		$('#pax #lbAdult').text(adult);
 		$('#pax #lbKid').text(kid);
		$('#pax #lbBaby').text(baby);
		
		var count= adult + kid + baby;
 		document.getElementById('opPasajeros').value=(count + " pasajero(s)");
		
	});
}