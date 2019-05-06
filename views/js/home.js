var adult = 0;
var kid = 0;
var baby = 0;
var myPop;
var calendar;
var count = 0;

var removedDestin;

$(function()
{
	'use strict';
    $('#srchForm').ready(initCalendar());
	
	removeDestinfromOrigin();
});

$('#tipo').change(function () 
{
	'use strict';
	
	if ($(this).val() === 'Sencillo') 
	{
		$("#opFechaReg").val("");
		$("#opFechaReg").hide();
		$("#lblFechaReg").hide();
		calendar.setSensitiveRange( new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toJSON().slice(0,10), null);
	}
	else
	{
		$("#opFechaReg").show();
		$("#lblFechaReg").show();
	}
});

$( "#origen" ).change(function() {
	'use strict';
	$("#destino").prepend(removedDestin);
	removeDestinfromOrigin();	
});

function removeDestinfromOrigin(){
	'use strict';
	if($("#destino option[value='" + $('#origen option:selected').val() + "']").length !== 0){
		removedDestin= $('#origen option:selected').clone();
		$("#destino option[value='" + $('#origen option:selected').val() + "']").remove();
	}
	
}

function recuperarVuelos()
{
	'use strict';
	if(!(document.getElementById("clase").value == 'VIP' && baby > 0)){
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
	}else{
		msgAlert('Error..','no puede llevar bebes en clase VIP')
	}

}

function initCalendar()
{
	'use strict';
	calendar = new dhtmlXCalendarObject(["opFechaSal","opFechaReg"]);
	calendar.hideTime();
	calendar.showToday();
	calendar.setSensitiveRange( new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toJSON().slice(0,10), null);
	document.getElementById('opFechaSal').value =  new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toJSON().slice(0,10);
}

function setSens(id, k) {
	'use strict';
	
  	if (k == "min") {
		calendar.setSensitiveRange(document.getElementById(id).value, null);
	} else if(document.getElementById(id).value != ""){
		calendar.setSensitiveRange( new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toJSON().slice(0,10),document.getElementById(id).value);
	}
	
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
   				if(count < 10)
				{	
					adult++;
				}
    			break;
				
			case "subAdult":
   				if(adult > 0)
				{	
					adult--;
					kid=0;
					baby=0;
					
				}
    			break;
				
			case "addKid":
   				if(count < 10 && (adult)*1.5 > (kid/2)+baby)
				{	
					kid++;
				}
    			break;	
			case "subKid":
				if(kid > 0)
				{
					kid--;
				}
    			break;
				
			case "addBaby":
   				if(count < 10 && (adult)*1.5 > (kid/2)+baby)
				{	
					baby++;
				}
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
		
		count= adult + kid + baby;
 		document.getElementById('opPasajeros').value=(count + " pasajero(s)");
		
	});
}