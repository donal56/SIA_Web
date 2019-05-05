/*jshint esversion: 6 */
var menu, formLog;
var logged = 0;
var email;
var winMsg;
var panel;

$(window).on('load',function() 
{
	'use strict';	
	document.getElementById('opPasajeros').value=("0 pasajero(s)");
	document.getElementById('opPasajeros').readOnly= true;
	$("#loader").fadeOut("slow");
});

function initDHTMLX() 
{
	'use strict';	
	var langCombo = dhtmlXComboFromSelect("language");
	langCombo.readonly(true);
	
	panel = new dhtmlXWindows();
	panel.attachViewportTo("main");

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
	winMsg.setDimension($(window).width()/2,$(window).height()/2);
	winMsg.centerOnScreen();
	
	$( window ).resize(function() {
		if(panel.isWindow('msg')){
			winMsg.setDimension($(window).width()/2,$(window).height()/2);
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
											{type: "fieldset", label: "Iniciar sesión", width: 250, name: "title", list: [ 
											{type: "input", label: "Correo electrónico", name: "email", required: true, validate: "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$", width: 220, style: "background-color: #FAFAFA"},
											{type: "password", label: "Contraseña", name: "pwd", required: true, validate: "validPass", width: 220, note: {text:"La contraseña debe contener por lo menos 8 carácteres, incluyendo mayúsculas, minúsculas y números.", style: "background-color: #FAFAFA"}},
											{type: "checkbox", label: "Crear una cuenta nueva", name: "wantsAnAccount", checked: false, position: "label-right"},
											{type: "button", value: "Iniciar sesión", name: "sign", width: 180}]}
										]);
										

			
			formLog.setSkin("material");		
			formLog.enableLiveValidation(true);
		
			formLog.attachEvent("onChange", function(name, command)
			{
				if (formLog.isItemChecked(name))
				{
					formLog.setItemLabel("sign", "Registrarse");	
					formLog.setItemLabel("title", "Crear una cuenta nueva");				
				}
				else
				{
					formLog.setItemLabel("sign", "Iniciar sesión");
					formLog.setItemLabel("title", "Iniciar sesión");
				}
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
							msgAlert("¡Bienvenido!","<h2>Inicio de sesión exitoso.</h2>");
							menu.unload();
							menu = null;
						}
						else
						{
							msgAlert("Error..","<h2>Correo y/o contraseña incorrectos.</h2>");
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
				msgAlert("Exito","Sesión cerrada");
				document.getElementById("userLabel").innerHTML= "Usuario";
				logged= 0;
				menu.unload();
				menu = null;
				window.location.replace("/");
			}
			else
			{
				msgAlert("Error","Error al cerrar sesión");
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
		sendMail("¡Gracias por Registrarte!",data.mail,data.html);
	},'json');
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
	msgAlert('Email Enviado..',successMsg);
	}else{
	msgAlert('Error..',msg);
	}
}

$(window).on('load', resize);
$(window).on('resize', resize);