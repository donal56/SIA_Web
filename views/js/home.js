var adult = 0;
var kid = 0;
var baby = 0;
var myPop;
var calendar;

function submitVuelo()
{
	var tipo = 	$('#tipo').val();
	var ori = 	$('#origen').val();
	var des =  	$('#destino').val();
	var pas1 =  adult;
	var pas2 =  kid;
	var pas3 =  baby;
	var clase = $('#clase').val();
	var f1 = 	$('#opFechaSal').val();
	var f2 = 	$('#opFechaReg').val();
	
	$.ajax(
	{
		type: 'GET',
		url: 'controllers/CntrlVuelo.php',
		data: 	{ 
					tipo : tipo, 
					ori : origen, 
					des : destino, 
					pas1 : pas1,
					pas2 : pas2,
					pas3 : pas3,
					clase : clase, 
					f1 : fechaSal, 
					f2 : fechaReg 
				},
		success: function(response) 
		{
		   
		},
		error: function(response) 
		{
		   alert(response);
		},
		contentType: 'application/x-www-form-urlencoded; charset= iso-8859-1',
		complete: function (response) 	
		{
          $('#main').html(response.responseText);
		}
	});
}

$(function()
{
	'use strict';
    $('#srchForm').ready(initCalendar());
});

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