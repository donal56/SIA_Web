$.fn.selectpicker.Constructor.BootstrapVersion = '4';

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
	if ($(window).width() <=480)
		$(".logo").attr('src', 'img/logo1-min.png');
	else
	$(".logo").attr('src', 'img/logo1.png');
}

$(window).on('load', resize);
$(window).on('resize', resize);