/* Data for Main Tab -------------------------------*/
var oActionBar ={

	initActionBar:function(){
		//$(".actionBar a").on("click",oActionBar.linkTouchEnd);
		$(".actionBar a").on('touchstart mousedown',oActionBar.hoverEffect);
		$(".actionBar a").on('touchend mouseup',oActionBar.linkTouchEnd);
	},
	
	hoverEffect:function(evt){
		evt.preventDefault();
		/*if (thisAnchor.hasClass("hoverEffect")){
			thisAnchor.removeClass("hoverEffect");
		}*/
		$(this).addClass("hoverEffect");
	},

	linkTouchEnd:function(evt){
		evt.preventDefault();
		
	  	/*if ($(this).hasClass("hoverEffect")){
		    var hoverRemove = function(){
		        $(this).removeClass("hoverEffect");
		    }
		    setTimeout(hoverRemove,300);
	  	}*/
	  	
		var xId = $(this).attr("href");
		oBaseController.changePage(xId);
		//$("body").trigger(oEvent.SELECT_MENU,[xId]);
		
	}
};

