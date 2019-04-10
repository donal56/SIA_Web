var menu;
var formLog;

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
	return data.length >= 8 && data.search(/a-zA-Z0-9/);
}

function showLogin(obj) 
{
	'use strict';
	if (!menu) 
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
		
		formLog.enableLiveValidation(true);
		formLog.setSkin("material");
		
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
		
		formLog.attachEvent("onButtonClick", function(name, command)
		{
			var email = formLog.getItemValue("email");
			var pass = formLog.getItemValue("pwd"); 
			
			if(name == "sign" && formLog.getItemValue("wantsAnAccount"))
			{
				alert("Creare una cuenta con los datos: \n" + email + "\n" + pass);
				menu.send("login.php", "get");
				menu.unload();
				menu = null;
			}
			else if(id == "sign")
			{
				alert("Accesare a la cuenta con los datos: \n" + email + "\n" + pass);
				menu.send("login.php", "get");
				menu.unload();
				menu = null;
			}
        });
		
		
	}
	if (menu.isVisible()) 
	{
		menu.hide();
	} 
	else 
	{
		var x = window.dhx4.absLeft(obj);
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

$(window).on('load', resize);
$(window).on('resize', resize);

