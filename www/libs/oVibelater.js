
/*****************************
 * バイブレーションコントローラー
 *****************************/
 
var oVibelater = {
	
	pVibePattern:[],
	pInterval:null,
	pVibTimer:null,
	END_VIBE:"endVibelate",
	
	isSupport:function(){
		var xRes = false;
		if(window.navigator.vibrate){
		  xRes = true;
		}else if(window.navigator.mozVibrate){
		  xRes = true;
		}else if(window.navigator.webkitVibrate){
		  xRes = true;
		}
		return xRes;
	},

	setPattern:function(xArray){
		oVibelater.pVibePattern = xArray;
	},

	totalMs:function(){
		var xTotal = 0;
		if (oVibelater.pVibePattern.length > 0){
			for(var i=0; i<this.pVibePattern.length; i++){
			  xTotal += this.pVibePattern[i];
			}
		}
		return xTotal;
	},
	
	start:function(){
		if (oVibelater.pVibePattern.length <= 0){
			oVibelater.pVibePattern = [oVibelater.pDuration];
		}
		//trace("Start Vibe=" + oVibelater.pVibePattern);
		
		/*
		if(window.navigator.vibrate){
		  window.navigator.vibrate(oVibelater.pVibePattern);
		}else if(window.navigator.mozVibrate){
		  window.navigator.mozVibrate(oVibelater.pVibePattern);
		}else if(window.navigator.webkitVibrate){
		  window.navigator.webkitVibrate(oVibelater.pVibePattern);
		}else{
		  alert("Sorry, Not support Vibration API");
		}
		*/
		navigator.vibrate(oVibelater.pVibePattern);
		
		pVibTimer = setTimeout(oVibelater.stop , oVibelater.totalMs());
	},
	
	startLoop:function(xItv) {
		oVibelater.stop();
		oVibelater.pInterval = setInterval(function() {
			//oVibelater.start();
			window.navigator.vibrate(oVibelater.pDuration);
		}, xItv);
	},
	
	stop:function(){
		//trace("Stop");
		if(oVibelater.pVibTimer) {
			clearTimeout(oVibelater.pVibTimer);
			oVibelater.pVibTimer = null;
		}
		
		if(window.navigator.vibrate){
		  window.navigator.vibrate(0);
		}else if(window.navigator.mozVibrate){
		  window.navigator.mozVibrate(0);
		}else if(window.navigator.webkitVibrate){
		  window.navigator.webkitVibrate(0);
		}else{
		  trace("Not support.");
		}
		
		oVibelater.timeoutFunc();
	},
	
	timeoutFunc:function(){
		//alert("timeOut");
		if(oVibelater.pInterval) {
			clearInterval(oVibelater.pInterval);
		}
		$("body").trigger(oVibelater.END_VIBE);
	}
	

}

