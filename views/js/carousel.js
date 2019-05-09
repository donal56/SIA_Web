var changebox = true;
var timerObj;
var timer = new Timer();
timer.start();

function Timer() {
	'use strict';
   this.start = function() {
        timerObj = setInterval(function(){
			changebox = false;
			$(".holder_bu_awayR1").trigger( "click" );
		}, 5000);
    };
    this.reset = function() {
        clearInterval(timerObj);
        this.start();
    };
}


var Conclave=(function(){
	var buArr =[],arlen;
	return {
		init:function(){
			this.addCN();this.clickReg();
		},
		addCN:function(){
			var buarr=["holder_bu_awayL2","holder_bu_awayL1","holder_bu_center","holder_bu_awayR1","holder_bu_awayR2"];
			for(var i=1;i<=buarr.length;++i){
				$("#bu"+i).removeClass().addClass(buarr[i-1]+" holder_bu");
				document.getElementById("bu"+i).style.backgroundImage = "url(views/img/destinos/" + translator.getl(($("#bu"+i+" p").text()), 'es').replace(/ /g,'') + ".jpg)";
			}
		},
		clickReg:function(){
			$(".holder_bu").each(function(){
				buArr.push($(this).attr('class'))
			});
			arlen=buArr.length;
			for(var i=0;i<arlen;++i){
				buArr[i]=buArr[i].replace(" holder_bu","")
			};
			$(".holder_bu").click(function(buid){
				if(changebox){
					timer.reset();
					if( $('#origen option:selected').val() == $(this).text()){
						$("#origen").prop('selectedIndex',$("#origen")[0].selectedIndex+1);
						$("#origen").trigger("change");
					}
					$('#destino').val($(this).text());
					
				}
				
				var me=this,id=this.id||buid,joId=$("#"+id),joCN=joId.attr("class").replace(" holder_bu","");
				var cpos=buArr.indexOf(joCN),mpos=buArr.indexOf("holder_bu_center");
				if(cpos!=mpos){
					tomove=cpos>mpos?arlen-cpos+mpos:mpos-cpos;
					while(tomove){
						var t=buArr.shift();
						buArr.push(t);
						for(var i=1;i<=arlen;++i){
							$("#bu"+i).removeClass().addClass(buArr[i-1]+" holder_bu");
						}
						--tomove;
					}
				}
				changebox = true;
				buid.stopPropagation();
			})
		},
		auto:function(){
			for(i=1;i<=1;++i){
				$(".holder_bu").delay(2000).trigger('click',"bu"+i).delay(2000);
				console.log("called");
			}
		}
	};
})();

$(document).ready(function(){
	window['conclave']=Conclave;
	Conclave.init();
})