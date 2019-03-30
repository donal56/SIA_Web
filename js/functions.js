$.fn.selectpicker.Constructor.BootstrapVersion = '4';

$(document).ready(function() {
	'use strict';	
 $(".loader").delay(2000).fadeOut("slow");
});

function solicitar(url)
{
	'use strict';
	$('#main').load(url, function (data)
	{
		$(this).html(data);
	});
}

function resize()
{
	'use strict';
	if ($(window).width() <=480){
		$(".logo").attr('src', 'img/logo1-min.png');
	}else{
		$(".logo").attr('src', 'img/logo1.png');
	}
	
}

$(window).on('load', resize);
$(window).on('resize', resize);