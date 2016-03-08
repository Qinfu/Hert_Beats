
//monaca.viewport({width:"device-width"});
//monaca.viewport({width:320});

oNowpea._wifiCheak = true;
oNowpea._langMode ="jp";
oBaseController._topPage = "#top";

//-------------------------------------//


//-------------------------------------//


/*-----------------------------*/

/*jQuely 初期化完了*/
function onJqReady(){
	trace("jqReady");
	
	//適宜リスナー登録
	$("body").on(oEvent.BACKGROUND_ON,onAppPause);
	$("body").on(oEvent.BACKGROUND_OFF,onAppResume);
	$("body").on(oEvent.GO_HOME,onGoHome);
	$("body").on(oEvent.APP_EXIT,onExitJob);
	$("body").on(oEvent.CHANGE_PAGE,onPageChange);
	
	//ブラウザ開発時
	//onStartApp();
}
	

/*コンテンツ開始*/
function onStartApp(){
	trace("startContent");
}

/*コンテンツ終了*/
function onExitJob(){
	trace("beforeExit");
	$("body").off(oEvent.BACKGROUND_ON);
	$("body").off(oEvent.BACKGROUND_OFF);
	$("body").off(oEvent.GO_HOME);
	$("body").off(oEvent.APP_EXIT);
}

/*ページが切り変わる*/
function onPageChange(evt,xId){
	trace("onPageChange=" + xId);
}

/*バックグラウンド動作になった*/
function onAppPause(){
	trace("onAppPause");
}

/*バックグラウンドから復帰*/
function onAppResume(){
	trace("onAppResume");
}

function onGoHome(){
	/**/
}