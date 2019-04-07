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
	if ($(window).width() <=480){
		$(".logo").attr('src', 'views/img/logo1-min.png');
	}else{
		$(".logo").attr('src', 'views/img/logo1.png');
	}
	
}

$(window).on('load', resize);
$(window).on('resize', resize);

