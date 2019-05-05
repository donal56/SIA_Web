var noBoleto;

$(document).ready(function(){
	'use strict';
	$("#datos").submit(function(event){
	msgLoading();
	$.get('controllers/CntrlCheckin.php',(
											$.param({func: 0})+'&'+ 
											$(this).serialize()+'&'+
											$.param({email: email})	 
										 ),function(data) {
		//php "echo" data into a div
		noBoleto = $('#noBoleto').val();
     	msgAlert("Checkin pass...",data);
	});		
	// Prevent default form action
    event.preventDefault();
	event.stopImmediatePropagation();
   
	});
});
	

function confirm(){
	'use strict';
	msgLoading();
	$.getJSON('controllers/CntrlCheckin.php',{	
											func:1,
										  	email: email,
										  	numBoleto: noBoleto
										 },function(data) {
		sendAttachMail('!Imprime tu pase de abordar!',data.mail,data.path,data.html);
	});
	
}

	

