/*jshint esversion: 6 */
var menu, formLog;
var logged = 0;
var email;
var winMsg;
var panel;
var translator;
var langCombo;

$(window).on('load',function() 
{
	'use strict';
	translator = $('body').translate({lang: localStorage.getItem("lang")});
	document.getElementById('opPasajeros').value=("");
	$("#loader").fadeOut("slow");
});



function initDHTMLX() 
{
	'use strict';	
	panel = new dhtmlXWindows();
	panel.attachViewportTo("main");

	langCombo = dhtmlXComboFromSelect("language");
	langCombo.readonly(true);
	langCombo.disableAutocomplete();
	langCombo.selectOption(localStorage.getItem('lang') == 'es' ? 0 : 1);
	
	langCombo.attachEvent('onChange', function(value, text)
	{
		switch(value) 
		{    	
			case "es-MX":
				localStorage.setItem("lang", "es");
				break;
			case "en-US":
				localStorage.setItem("lang", "en");
				break;
		}	
		translator.lang(localStorage.getItem("lang"));
		actualizarFormLog(true);
		document.getElementById('opPasajeros').value= "";
		
	});
}

function generateWindow(){
	winMsg = panel.createWindow('msg',0,0,0,0);
	winMsg.setMinDimension(250, 250);
	winMsg.setDimension($(window).width()/2,$(window).height()/2);
	winMsg.centerOnScreen();
	
	winMsg.denyMove();
	winMsg.denyResize();
	winMsg.denyPark();	
	winMsg.button('park').hide();
	winMsg.button('minmax').hide();
	winMsg.button('close').show();
	winMsg.setDimension($(window).width()/2,$(window).height()/1.7);
	winMsg.centerOnScreen();
	
	$( window ).resize(function() {
		if(panel.isWindow('msg')){
			winMsg.setDimension($(window).width()/2,$(window).height()/1.7);
			winMsg.centerOnScreen();
		}
		
	});	
}

function msgLoading(){
	"use strict";
	if(!panel.isWindow('msg')){generateWindow();}
	winMsg.attachObject(document.getElementById("winLoader").cloneNode(true));
	winMsg.hideHeader();
	winMsg.setModal(true);
	
}

function msgAlert(title,html){
	"use strict";
	if(!panel.isWindow('msg')){generateWindow();}
	winMsg.setText(title);
	winMsg.attachHTMLString(html);
	winMsg.showHeader();
	winMsg.setModal(true);
}

function msgHTML(title,html){
	"use strict";
	if(!panel.isWindow('msg')){generateWindow();}
	winMsg.setText(title);
	winMsg.attachURL(html, true);
	winMsg.showHeader();
	winMsg.setModal(true);
}


function solicitar(url) 
{
	"use strict";
	msgLoading();
	$("#content").load(url, function (data) 
	{
		$(this).html(data);
		winMsg.close();
	});
}

function resize()
{
	'use strict';
	// 320px sería el mínimo práctico
	if ($(window).width() <=480)
	{
		$(".logo").attr('src', 'views/img/logo1-min.png');
	}
	else
	{
		$(".logo").attr('src', 'views/img/logo1.png');
	}
	
}

function validPass(data)
{
	'use strict';
	return data.length >= 8 && data.search(/a-zA-Z0-9/);
}

function showLogin(obj) 
{
	
	'use strict';
	if (!menu) 
	{
		if(logged)
		{
			menu = new dhtmlXPopup();
			menu.attachObject("opcionesUsuario");
			menu.setDimension(90, 65);

		}
		else
		{
			menu = new dhtmlXPopup();
			formLog = menu.attachForm	([
											{type: "settings", position: "label-top"},
											{type: "fieldset", label: translator.get("Iniciar sesión"), width: 250, name: "title", list: [ 
												{type: "input", label: translator.get("Correo electrónico"), name: "email", required: true, validate: "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$", width: 220, style: "background-color: #FAFAFA"},
												{type: "password", label: translator.get("Contraseña"), name: "pwd", required: true, validate: "validPass", width: 220, info: true, note: {text: translator.get("La contraseña debe contener por lo menos 8 carácteres, incluyendo mayúsculas, minúsculas y números."), style: "background-color: #FAFAFA"}},
												{type: "checkbox", label: translator.get("Crear una cuenta nueva"), name: "wantsAnAccount", checked: false, position: "label-right"},
												{type: "button", value: translator.get("Iniciar sesión"), name: "sign", width: 180}]}
										]);		
			
			formLog.setSkin("material");		
			formLog.enableLiveValidation(true);
		
			formLog.attachEvent("onChange", function(name, command)
			{
				actualizarFormLog(false);
			});
			
			formLog.attachEvent("onInfo", function(name, e)
			{
					var t = e.target||e.srcElement;

					// var x = window.dhx.absLeft(t);
					// var y = window.dhx.absTop(t);
					// var w = t.offsetWidth;
					// var h = t.offsetHeight;
					// myPopup.show(x,y,w,h);
					
					msgAlert(translator.get("¿Olvidaste tu contraseña?"), translator.get("Una nueva contraseña sera enviada a tu correro electrónico") + ".<br><button type= 'button' class= 'btnSIA' onclick= 'recuperarContraseña(\"" + email +"\");'>" + translator.get("Recuperar Contraseña") + "</button>");
			});
			
			formLog.attachEvent("onButtonClick", function(id)
			{
				email = formLog.getItemValue("email");
				var pass = formLog.getItemValue("pwd");
				var wantsAnAccount= formLog.getItemValue("wantsAnAccount");
				
				if(id == "sign" && !wantsAnAccount)
				{
					msgLoading();
					hideLogin();
	
					formLog.send("controllers/CntrlUsuario.php", "post", function(loader, response)
					{
						logged= Number(response);
						
						if (logged)
						{
							document.getElementById("userLabel").innerHTML= email.split('@')[0];

							wait(1000);
							msgAlert(translator.get("¿Bienvenido!"), "<h2>" + translator.get("Inicio de sesión exitoso.") + "</h2>");
							menu.unload();
							menu = null;
						}
						else
						{
							msgAlert(translator.get("Error"), "<h2>" + translator.get("Correo y/o contraseña incorrectos.") + "</h2>");
						}
					});
				}
				else if(id == "sign" && wantsAnAccount)
				{
					registerUser();
					
				}
			});
		}
	}

	
	if (menu.isVisible()) 
	{
		menu.hide();
	} 
	
	else 
	{
		var x = window.dhx4.absLeft(obj) - 25;
		var y = window.dhx4.absTop(obj);
		var w = obj.offsetWidth;
		var h = obj.offsetHeight;
		menu.show(x,y,w,h);
	}
}
		
function hideLogin() 
{
	'use strict';
	menu.hide();
}

function wait(ms)
{
	'use strict';
	var start = new Date().getTime();
	var end = start;
	while(end < start + ms) 
	{
     end = new Date().getTime();
	}
}

function cerrarSesion()
{
	'use strict';
	msgLoading();
	 $.ajax({
        type: "POST",
        url: "controllers/CntrlUsuario.php",
        data: {cerrarSesion: "1"},
        success: function(result) 
		{
            if(result)
			{
				msgAlert(translator.get("Error"), translator.get("Sesión cerrada"));
				document.getElementById("userLabel").innerHTML= translator.get("Usuario");
				logged= 0;
				menu.unload();
				menu = null;
				window.location.replace("/");
			}
			else
			{
				msgAlert(translator.get("Error"),translator.get("Error al cerrar sesión"));
			}
        }
    });
}

function registerUser(){
	'use strict';
	$.post('controllers/CntrlUsuario.php',{	
										  	email: email,
										  	pass: formLog.getItemValue("pwd")
										 },function(data) {
		sendMail(translator.get("¡Gracias por Registrarte!"),data.mail,data.html);
	},'json');
}

function formEmpty(frm){
	'use strict';
	var empty = false;
	$(frm+' input:visible').each(function(){
	   if($(this).val()==""){
		   empty = true;
		}
	 });
	
	return empty;
}


function sendMail(subject,body,msghtml){
	'use strict';
	msgLoading();
	Email.send({
		SecureToken : "ec85c9d3-7782-43cb-8179-63d4d1ed2b0f",
		To : email,
		From : "notifier@aeroalpes.tk",
		Subject : subject,
		Body : body
	}).then(
	  message => emailConfirmMsg(message,msghtml)
	);
	
}

function sendAttachMail(subject,body,path,msghtml){
	'use strict';
	msgLoading();
	Email.send({
		SecureToken : "ec85c9d3-7782-43cb-8179-63d4d1ed2b0f",
		To : email,
		From : "notifier@aeroalpes.tk",
		Subject : subject,
		Body : body,
		Attachments : [
		{
		name : path.split('/').pop(),
		path : path
		}]
		
	}).then(
	  message => emailConfirmMsg(message,msghtml)
	);
	
}

function emailConfirmMsg(msg,successMsg){
	'use strict';
	if(msg == "OK"){
	msgAlert(translator.get("Mensaje enviado"),successMsg);
	}else{
	msgAlert(translator.get("Error"),msg);
	}
}

function actualizarFormLog(b)
{
	if (formLog.isItemChecked("wantsAnAccount"))
	{
		formLog.setItemLabel("sign", translator.get("Registrarse"));	
		formLog.setItemLabel("title", translator.get("Crear una cuenta nueva"));				
	}
	else
	{
		formLog.setItemLabel("sign", translator.get("Iniciar sesión"));
		formLog.setItemLabel("title", translator.get("Iniciar sesión"));
	}
	
	if(b)
	{
		formLog.setItemLabel("email", translator.get("Correo electrónico"));
		formLog.setItemLabel("pwd", translator.get("Contraseña"));
		formLog.setNote("pwd", {text: translator.get("La contraseña debe contener por lo menos 8 carácteres, incluyendo mayúsculas, minúsculas y números.")});
		// formLog.setItemValue("pwd", [{info: true}]);
		formLog.setItemLabel("wantsAnAccount", translator.get("Crear una cuenta nueva"));
	}
}
//maybe move to vuelos.js
function pay(){
	//msgHTML("Pagos","views/Payment.phtml"); call with this
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
   }else if (((sum%10 === 0) && (sum > 0))){
	   sendTicket();
   }else{
	    $("#info").text(translator.get("Revise su tarjeta"));
   }
}

function sendTicket(){
	'use strict';
	//TODO: post php ticket controller
	msgAlert(translator.get("Pagado"),translator.get("Gracias por su preferencia"));
	
}

$(window).on('load', resize);
$(window).on('resize', resize);