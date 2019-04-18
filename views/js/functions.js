/*jshint esversion: 6 */
var menu, formLog;
var logged = 0;

$(document).ready(function() 
{
	'use strict';	
	$(".loader").delay(1500).fadeOut("slow");
});

function initLang() 
{
	'use strict';	
	var langCombo = dhtmlXComboFromSelect("language");
	langCombo.readonly(true);
}

function solicitar(url) 
{
	"use strict";
	$("#main").load(url, function (data) 
	{
		$(this).html(data);
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
				var email = formLog.getItemValue("email");
				var pass = formLog.getItemValue("pwd");
				var wantsAnAccount= formLog.getItemValue("wantsAnAccount");
				
				if(id == "sign" && !wantsAnAccount)
				{
					//alert("Entrare a la cuenta con los datos: \n" + email + "\n" + pass);
					formLog.send("controllers/CntrlUsuario.php", "post", function(loader, response)
					{
						logged= Number(response);
						
						if (logged)
						{
							document.getElementById("userLabel").innerHTML= email.split('@')[0];
							alert("Inicio de sesión exitoso.");
							menu.unload();
							menu = null;
						}
						else
						{
							alert("Correo y/o contraseña incorrectos.");
						}
					});
				}
				else if(id == "sign" && wantsAnAccount)
				{
					sendMail("#footer","¡Gracias por Registrarte!");
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
	 $.ajax({
        type: "POST",
        url: "controllers/CntrlUsuario.php",
        data: {cerrarSesion: "1"},
        success: function(result) 
		{
            if(result)
			{
				alert("Sesión cerrada");
				document.getElementById("userLabel").innerHTML= "Usuario";
				logged= 0;
				menu.unload();
				menu = null;
			}
			else
			{
				alert("Error al cerrar sesión");
			}
        }
    });
}

function sendMail(divMessage,subject){
	'use strict';
	// html message use display:none
	var content = $(divMessage).eq(0).clone();	
	Email.send({
		SecureToken : "ec85c9d3-7782-43cb-8179-63d4d1ed2b0f",
		To : formLog.getItemValue("email"),
		From : "notifier@aeroalpes.tk",
		Subject : subject,
		Body : content.get(0).outerHTML
	}).then(
	  message => alert(message)
	);
	
}

$(window).on('load', resize);
$(window).on('resize', resize);