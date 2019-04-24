$(document).ready(function(){
	'use strict';
	$("#datos").submit(function(event){
	$.get('controllers/CntrlCheckin.php',(
											$(this).serialize()+'&'+
											$.param({email: userEmail})	  
										 ),function(data) {
		//php "echo" data into a div
     	$('#contCheck').html(data);
	});		
	// Prevent default form action
    event.preventDefault();
   
	});
});
	
