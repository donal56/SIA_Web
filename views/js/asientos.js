$(function()
{
    $('.bloque').ready(initSeatCalendars());
});

function initSeatCalendars()
{
	'use strict';
	calendar = new dhtmlXCalendarObject(["bday"]);
	calendar.hideTime();
}