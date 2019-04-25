var noBoleto;

$(document).ready(function(){
	'use strict';
	$("#datos").submit(function(event){
	$.get('controllers/CntrlCheckin.php',(
											$.param({func: 0})+'&'+ 
											$(this).serialize()+'&'+
											$.param({email: userEmail})	  
										 ),function(data) {
		//php "echo" data into a div
		noBoleto = $('#noBoleto').val();
     	$('#contCheck').html(data);
	});		
	// Prevent default form action
    event.preventDefault();
	event.stopImmediatePropagation();
   
	});
});
	

function confirm(){
	'use strict';
	$.get('controllers/CntrlCheckin.php',{	
											func:1,
										  	email: userEmail,
										  	numBoleto: noBoleto
										 },function(data) {
    	$('#contCheck').html(data);
	});
	
}

	

