$(document).ready(function(){
	'use strict';
	$("#datos").submit(function(event){
	$.get('controllers/CntrlCheckin.php',$(this).serialize(),function(data) {
		//php "echo" data into a div
     	$('#contCheck').html(data);
	});
	// Prevent default form action
    event.preventDefault();
   
	});
});
	

function generarPase(boleto)
{
	var doc = new jsPDF(
	{
		unit: 'in',
		format: [4, 2]
	})

	doc.setFontSize(35);
	doc.text('Pase de abordar', 10, 10);
	
	doc.setLineWidth(0.5);
	doc.line(20, 25, 60, 25);
	
	doc.setFontSize(20);
	doc.text(boleto, 10, 30);
	
	doc.save('pase-de-abordar-' + boleto + '.pdf');
}

