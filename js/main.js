var adult = 0;
var kid = 0;
var baby = 0;
var myPop;
var calendar;

function initCalendar(){
	'use strict';
	
		calendar = new dhtmlXCalendarObject(["opFechaSal","opFechaReg"]);
		calendar.hideTime();
}

function showPass(inp) {
	'use strict';
	if (!myPop) {
		myPop = new dhtmlXPopup();
		myPop.attachHTML("<div class='pasajeros'>" +
						 	 "Adultos <br>"+
							 "<input type='radio' id='subAdult' name = 'radButton'>"+
							 "<label id='lbAdult'>0</label>"+
							 "<input type='radio' id='addAdult' name = 'radButton' >"+
						 	 "<br> Menores <br>"+
						 	 "<input type='radio' id='subKid' name = 'radButton'>"+
							 "<label id='lbKid'>0</label>"+
							 "<input type='radio' id='addKid' name = 'radButton' >"+
						 	 " <br> Bebes <br>"+
						 	"<input type='radio' id='subBaby' name = 'radButton'>"+
							 "<label id='lbBaby'>0</label>"+
							 "<input type='radio' id='addBaby' name = 'radButton' >"+
						 
						 "</div>");
		
	}
	if (myPop.isVisible()) {
		myPop.hide();
	} else {
		var x = window.dhx4.absLeft(inp);
		var y = window.dhx4.absTop(inp);
		var w = inp.offsetWidth;
		var h = inp.offsetHeight;
		myPop.show(x,y,w,h);
		passCount();
	}
}
		
function hidePass() {
	'use strict';
	if (myPop) {
		myPop.hide();
	}
}

function passCount(){
	'use strict';
	$("input[name='radButton']").click(function() {
		
		switch(this.id){
			 case "addAdult":
   				adult++;
    			break;
			case "subAdult":
   				if(adult > 0){
					adult--;
				}
			
    			break;
			case "addKid":
   				kid++;
    			break;
			case "subKid":
				if(kid > 0){
   				kid--;
				}
    			break;
			case "addBaby":
   				baby++;
    			break;
			case "subBaby":
   				if(baby> 0){
   				baby--;
				}
    			break;
		}
      
		$('.pasajeros #lbAdult').text(adult);
 		$('.pasajeros #lbKid').text(kid);
		$('.pasajeros #lbBaby').text(baby);
		
		document.getElementById('opPasajeros').value=("adultos:"+adult+" niños:"+kid+" bebes:"+baby);
		
	});

}