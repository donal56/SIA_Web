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
		passCount();
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
   				if(baby> 0)
				{
					baby--;
				}
    			break;
		}
      
		$('#pax #lbAdult').text(adult);
 		$('#pax #lbKid').text(kid);
		$('#pax #lbBaby').text(baby);
		
		document.getElementById('opPasajeros').value=("Adultos: "+adult+" ,niños: "+kid+", bebes: "+baby);
		
	});

}