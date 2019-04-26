var noBoleto;

$(document).ready(function(){
	'use strict';
	$("#datos").submit(function(event){
	$.get('controllers/CntrlCheckin.php',(
											$.param({func: 0})+'&'+ 
											$(this).serialize()+'&'+
											$.param({email: email})	 
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
	$.getJSON('controllers/CntrlCheckin.php',{	
											func:1,
										  	email: email,
										  	numBoleto: noBoleto
										 },function(data) {
		sendAttachMail(data['mail'],'!Imprime tu pase de abordar!',data['path']);
		$('#contCheck').html(data['html']);
	});
	
}

	

