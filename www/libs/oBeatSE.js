
oBeatSE = {
	MEDIA_SND:null,
	_SE:"asset/snd/hb_01.mp3",
	_TIMER:null,
	
	play:function(xInterval){
		oBeatSE.stopAudio();
		if (!oBeatSE.MEDIA_SND) {
			var xSE = getPath() + oBeatSE._SE;
			oBeatSE.MEDIA_SND = new Media (xSE, oBeatSE.onSuccess, oBeatSE.onError);
		}
		oBeatSE.MEDIA_SND.play();
		//oBeatSE.MEDIA_SND.play({numberOfLoops:"infinite"});
    
	    if (oBeatSE._TIMER == null) {
	    	oBeatSE._TIMER = setInterval(function() {
	    		oBeatSE.MEDIA_SND.getCurrentPosition(
	    			
	    			//成功時のコールバック関数
	    			function(position) {
		    			oBeatSE.MEDIA_SND.stop();
		    			oBeatSE.MEDIA_SND.play();
		    			/*
	    				if (position > -1) {
	    					//setAudioPosition((position) + " sec");
	    					//端末によっては再生位置が-0.001で止まるので、その場合は再度読み込みます。
	    					if(position == -0.001){
	    						//oBeatSE.MEDIA_SND.play({numberOfLoops:"infinite"});
	    						oBeatSE.MEDIA_SND.play();
	    					}
	    				}*/
	    			},
	    			
	    			//失敗時のコールバック関数
	    			function(e) {
	    				console.log("Error getting pos=" + e);
	    				setAudioPosition("Error: " + e);
	    			}
	    		);
	    	}, xInterval);
	    }
	},
	
	stopAudio:function() {
		if (oBeatSE.MEDIA_SND) {
			oBeatSE.MEDIA_SND.stop();
		}
		if (oBeatSE._TIMER){
			clearInterval(oBeatSE._TIMER);
			oBeatSE._TIMER = null;
		}
	},
	
	onSuccess:function() {
		trace("playAudio():Audio Success");
	},
	
	onError:function(error) {
		trace('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
	}
	
};




