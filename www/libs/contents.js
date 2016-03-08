
/*******************
 * Strat Content
 *******************/

function onStartApp(){
	//trace("LAnguage =" + oNowpea._langMode);
	$("#heartImg").on("click",fsSetBeat);
	$("#typeSymbol").on("click",fsSetBeat);
	
	var xOptArray = oBeatData.getNameList(oNowpea._langMode);
	//trace(xOptArray);
	for (var i=0; i<xOptArray.length; i++){
		$("select#beType").append("<option value='"+i+"'>" + xOptArray[i] + "</option>");
	}
	fsSetBeatData(0);
	
	$("select#beType").on("change",fsSetInfo);
    $("body").on(oVibelater.END_VIBE,fsStopAnimate);
	
	/*
	$(".animated").on('webkitAnimationEnd', function(){
        //alert("End Trans");
    });
    */

}


/*戻るボタン処理（オーバーライド）*/
oBaseController.onBuckButton = function(){
	if (pMode){
		pMode = false;
		oVibelater.stop();
	}else{
		oNowpea.exitApp();
	}
}


function getPath() {
	var str = location.pathname;
	var i = str.lastIndexOf('/');
	return str.substring(0,i+1);
}


/*******************
 * Select Type
 *******************/
function fsSetInfo(evt){
	evt.preventDefault();
	var xIdx = Number($("#beType option:selected").val());
	fsSetBeatData(xIdx);
	oVibelater.stop();
	fsStopAnimate();
}

/*******************
 * Set Type Data
 *******************/
function fsSetBeatData(xIdx){
	var xBeatPerMin =  oBeatData.pBeatList[xIdx]._beat;
	$("span.btTxt").html(xBeatPerMin);
	
	var xClass = "flaticon-" +  oBeatData.pBeatList[xIdx]._icon;
	$("#typeSymbol p").removeClass();
	$("#typeSymbol p").addClass(xClass);
	
	//$("span.flaticon-tyIcon").html("&#x" + oBeatData.pBeatList[xIdx]._icon);
}

/*******************
 * Start Beats
 *******************/

var pMode = false;
 
function fsSetBeat(evt){
	evt.preventDefault();
	//if($("#heartImg").hasClass("beatMotion")){
	if (pMode){
		pMode = false;
		oVibelater.stop();
	}else{
		pMode = true;
		var xIdx = Number($("#beType option:selected").val());
		//trace(xIdx);
		
		var xPattern = oBeatData.getBratList(xIdx);
		oVibelater.setPattern(xPattern);
		oVibelater.start();
		
		var xBeat = xPattern[0];
		var xStay = xPattern[1];		
		var xCssTxt = fsCreateKeyDatas(xBeat,xStay);
		
		$("#heartImg").a3d(xCssTxt);
	}
}

//Create Key Frame Data
function fsCreateKeyDatas(xBeat,xStay){
	var xBeatTimer =xBeat + xStay;
	var xEndPer = xBeat/xBeatTimer;
	xEndPer = Math.round(xEndPer * 100);
	var xHred = Math.round(xEndPer/2);

	var a3d_define = {};
    a3d_define.frames = {};
    a3d_define.config = {};
	
	a3d_define.frames["0%"] = {trans:{"scale3d":"1, 1, 1"}};
	a3d_define.frames[xHred + "%"] = {trans:{"scale3d":"1.05,1.05, 1.05"}};
	a3d_define.frames[xEndPer + "%"] = {trans:{"scale3d":"1, 1, 1"}};
	a3d_define.frames["100%"] = {trans:{"scale3d":"1, 1, 1"}};
	
	a3d_define.config.duration = xBeatTimer + "ms";
    a3d_define.config.state = "running";
    a3d_define.config.easing= "linear";
    a3d_define.config.count = "infinite";
     
 	return(a3d_define);
}

/*******************
 * End Beat
 *******************/
function fsEndBeat(){
	/**/
}


function fsStopAnimate(){
	trace("End Vibe");
	//oVibelater.stop();
	$("#heartImg").css("animation-name","");
	$("#heartImg").removeClass();
	pMode = false;
	//oBeatSE.stopAudio();
}


