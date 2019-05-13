// JavaScript Document
function pay(){
	'use strict';
	
	var luhn = $('#cc').val();
	var ca, sum = 0, mul = 1;
    var len = luhn.length;
    while (len--)
    {
        ca = parseInt(luhn.charAt(len),10) * mul;
        sum += ca - (ca>9)*9;// sum += ca - (-(ca>9))|9
          // 1 <--> 2 toggle.
        (mul = 3 - mul); // (mul = 3 - mul);
    }
   if(formEmpty("#formPay")){
	    $("#info").text(translator.get("Por favor, ingrese todos los datos"));
	     $("#info").css("color", "red");
   }else if (((sum%10 === 0) && (sum > 0))){
	   sendTicket();
   }else{
	    $("#info").text(translator.get("Revise su tarjeta"));
	    $("#info").css("color", "red");
   }
}

function sendTicket(){
	'use strict';
	msgLoading();
	//TODO: post php ticket controller
	$.post('controllers/CntrlPagos.php',(
										$.param({
										idFly: sessionStorage.idFly,
										arrP : sessionStorage.pax,
										cantAdult:sessionStorage.cantAdult,
										cantKid:sessionStorage.cantKid,
										cantBaby:sessionStorage.cantBaby,
										})
									),function(data) {
			
		msgAlert('Gracias',data);
		winMsg.button('close').hide();

	});	
	
	
//	msgAlert(translator.get("Pagado"),translator.get("Gracias por su preferencia"));
		
}

function printTicket(){
	msgLoading();
	//TODO: post php ticket controller
	$.post('controllers/CntrlPagos.php',(
										$.param({
										print:"web",
										idFly: sessionStorage.idFly,	
										tipoCC:"tet",
										CC:"xxxxx",
										paydate:"test"
										})
									),function(data) {
			
		window.location.href = data;

	});	
}

/*
			sessionStorage.paxFom = $('#f1').serialize();
			sessionStorage.flydetails= $.param({
										tipo : tipo,
										cantAdult : adultos,
										cantKid : niños,
										cantBaby: bebes,
										clase : clase, 
										fechaAct : new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toJSON().slice(0,10), 
										idvuelo : v1
										});
			
			$.post('controllers/CntrlPagos.php',(
									$.param({
										tipo : tipo,
										cantAdult : adultos,
										cantKid : niños,
										cantBaby: bebes,
										clase : clase, 
										fechaAct : new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toJSON().slice(0,10), 
										idvuelo : v1
										})
									),function(data) {
			
				

									});	
	*/