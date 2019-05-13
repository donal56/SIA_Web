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
	
	if(document.getElementById('cc').value.substr(0,1)=="5"){
		sessionStorage.ccType="MasterCard";
	}else{
		sessionStorage.ccType="VISA";
	}

	sessionStorage.cc = "XXXXXXXXXXX"+document.getElementById('cc').value.substr(16 -4);
	sessionStorage.tel =document.getElementById('tel').value;
	
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
	'use strict';
	msgLoading();

	//TODO: post php ticket controller
	$.post('controllers/CntrlPagos.php',(
										$.param({
										print:"web",
										idFly: sessionStorage.idFly,	
										tipoCC:sessionStorage.ccType,
										CC:sessionStorage.cc,
										payDate: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toJSON().slice(0,10),
										tel:sessionStorage.tel
										})
									),function(data) {
			winMsg.close();
			window.location.href = data;

	});	
}
