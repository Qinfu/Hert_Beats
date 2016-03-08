var cSndEvent={
	MEDIA_START:"mediaStart",
	MEDIA_STOP:"mediaStop",
	EMD_MEDIA:"endMedia",
	UPDATE_DURATION:"updateDuration",
	CLEAR_COUNTER:"clearCounter"
}

var cSndPlayer = function() {
	this._sndMedia = null;
	this._dDurationTimer = null;
	this._soundPath = "";
	this._sndStates ="none";
	this._initState = false;
	this._currentTime = -1;

	this._dDuratonCtx = null;
}

cSndPlayer.prototype = {
	
	jq:$(this),

    bind:function( evt, func ){
        this.jq.bind( evt, func );
    },
    trigger:function( evt ){
        this.jq.trigger( evt );
    },

	create:function(){
		// do something
		return this;
	},


	/*再生開始*/
	mpPlayMedia:function(){
		if(this._soundPath != ""){
			try{
				this.fsStopMedia(true);
			}catch(err){
				//
			}
			
		    this._dDurationTimer = setInterval(this.fsUpdateDuration,1000);
			this._sndMedia = new Media(this._soundPath,this.fsMediaSuccess,this.fsMediaError);
			this._soundPath.play();
		}
	},

	/*再生完了*/
	fsMediaSuccess:function (){
		this.fsStopMedia(false);
		this.trigger(cSndEvent.EMD_MEDIA);
	},

	/*再生失敗*/
	fsMediaError:function (err){
		alert(err.code + "\n" + err.message);
		this.fsStopMedia(true);
	},

	/*メディア停止処理*/
	fsStopMedia:function (xState){
		try{
			this.fsStopTimer();
			this._sndStates ="none";
			this._sndMedia.stop();
			this._sndMedia.release();
			this._sndMedia = null;
			this._initState = false;
		}catch(err){
			//
		}finally{
			if(xState){
				this.trigger(cSndEvent.MEDIA_STOP);
			}
		}
	},

	//------------------------------------------------//

	/*再生*/
	mpPlayAudio:function (){
		if(this._initState){
			if(this._sndStates == "pause"){
				this._sndMedia.play();
				this._sndStates="play";
			}else if(this._sndStates == "none"){
				mpPlayMedia();
			}
		}
	},

	/*一時停止*/
	mpPauseAudio:function (){
		if (this._initState && this._sndStates == "play"){
			this._sndMedia.pause();
	        this._sndStates="pause";
		}
	},

	/*停止*/
	mpStopAudio:function (){
		if (this._initState && this._sndStates != "none"){
			//pSndStates = "stop";
			fsStopMedia(true);
		}
	},

	//------------------------------------------------//
	
	/*現在の再生時間を調べる*/
	fsUpdateDuration:function(){
	    if(this._sndMedia){
	        this._sndMedia.getCurrentPosition(
	            function(xPos) {
	            	if (xPos > -1){
		            	if(!this._initState && xPos >=0){
		            		this._initState = true;
		            		this._sndStates ="play";
		            		cSpFunction.mediaStart();
		            	}
		            	this._currentTime =xPos;
		            	this.trigger(cSndEvent.UPDATE_DURATION);
		            }
	            },
	            function(err) {
	               //
	            }
	        ); 
		}
	},
	
	/*再生カウンタ停止*/
	fsStopTimer:function(){
		if(this._dDurationTimer){
			clearInterval(this._dDurationTimer);
			this._dDurationTimer = null;
			this._currentTime =-1;
			this.trigger(cSndEvent.CLEAR_COUNTER);
		}
	},
	
	/*再生時間を返す*/
	mpGetTotalTime:function(xTime){
		var xTotal = -1;
		if(this._sndMedia){
	   		xTotal =  this._sndMedia.getDuration();
	   	}
	    return(xTotal);
	},

	/*秒数をタイムコードに変換*/
	mpSecToCode:function(xSec){
	    var xMin = Math.floor(xSec/60);
	    if (xMin <=9){
	        xMin = "0" + xMin;
	    }
	    var xSec = Math.round(xSec%60);
	    if (xSec <=9){
	        xSec = "0" + xSec;
	    }
	    return (xMin +":" + xSec);
	}
}
