var oNowpea ={
	_state:false,
	_langMode:"en",
	_wifiCheak:false,

	//1.jQuely 初期化完了
	initJquely:function(){
		trace("[oNowpea]init jQuely");
		//コンテンツ初期化
		oBaseController.initContent();
		onJqReady();
	},
	
	/*2.ページデータのロード完了*/
	initContent:function(){
		trace("[oNowpea]DOMContent Loaded ->"+ typeof device);
		
		if(typeof device === 'undefined'){
			document.addEventListener("deviceready", oNowpea.deviceReady, false);
		}else{
			oNowpea.deviceReady();
		}
	},

	/*3.PhoneGap 初期化完了*/
	deviceReady:function(){
		trace("[oNowpea]Device Ready");
			
		navigator.globalization.getPreferredLanguage(
			function (language) {
				if(language.value === "ja-JP"){
					oNowpea._langMode = "jp";
				}else{
					oNowpea._langMode = "en";
				}
				oNowpea.gotLanguage();
			},
			function () {
				oNowpea._langMode = "en";
				oNowpea.gotLanguage();
			}
		);
		oNowpea._state = true;
	},
	
	gotLanguage:function(){
		trace("[oNowpea]Langage Mode =" + oNowpea._langMode);
		trace("[oNowpea]Connected Wifi =" + oNowpea.connectType());
		//$(document).off("deviceready");
		
		//$("body").addClass("lg_" + oNowpea._langMode);
		if(oNowpea._langMode === "jp"){
			$(".eg").hide();
		}else{
			$(".jp").hide();
		}

		if (oNowpea.connectType() >= 1){
			$(document).on("pause",oNowpea.onPauseApp);
			$(document).on("resume",oNowpea.onResumeApp);
						
			oNowpea.startContent();
			//$(document).on("backbutton", fsBuckButtonAct);
		}else{
			oNowpea.alertNetconnect();
		}
	},
	
	/*コンテンツ開始*/
	startContent:function(){
		trace("[oNowpea]startContent");

		document.addEventListener("backbutton", oBaseController.onBuckButton, false);
		onStartApp();
		//スプラッシュ画像を閉じる
		navigator.splashscreen.hide();
	},
	
	/*ネット接続状態(0:未接続、1:通信回線、2:Wifi、3:イーサネット)*/
	connectType:function() {
		var xRes = 0;
		if (this._wifiCheak){			
		    var xNet = navigator.network.connection.type;
		    switch(xNet){
		    	case Connection.UNKNOWN:
		    		//xRes = false;
		    		break;
		    	case Connection.ETHERNET:
		    		xRes = 3;
		    		break;
		    	case Connection.WIFI:
		    		xRes = 2;
		    		break;
		    	case Connection.CELL_2G:
		    		xRes = 1;
		    		break;
		    	case Connection.CELL_3G:
		    		xRes = 1;
		    		break;
		    	case Connection.CELL_4G:
		    		xRes = 1;
		    		break;
		    	case Connection.NONE:
		    		//xRes = false;
		    		break;
		    }
		}else{
			xRes = 2;
		}
		return (xRes);
	},
		
	/*アプリ終了*/
	exitApp:function(){
		//$(document).unbind("backbutton", fsBuckButtonAct);
		oBaseController.beforeExitApp();
		$(document).off("pause");
		$(document).off("resume");
		//$("body").trigger(oEvent.EXIT_APP);
		navigator.app.exitApp();
	},
	
	/*バックグラウンド動作になった*/
	onPauseApp:function(){
		trace("[oNowpea]Pause App");
		$("body").trigger(oEvent.BACKGROUND_ON);
	},

	/*バックグラウンドから復帰*/
	onResumeApp:function(){
		trace("[oNowpea]Resume App")
		$("body").trigger(oEvent.BACKGROUND_OFF);
	},

	/*ホームへ戻る*/
	retuntoHome:function(){
		//monaca.pushPage('index.html');
		//monaca.popPage();
		$("body").trigger(oEvent.GO_HOME);
	},

	/*ネット未接続アラート*/
	alertNetconnect:function(){
		var xAltTxt = "This application uses internet connection.And we recommend to use wi-fi.";
		var xAltTTl = "Caution";
		if (this._langMode == "jp"){
			xAltTxt = "インターネット接続が有効になっていません。本アプリはWifiでの利用を推奨いたします。";
			xAltTTl = "ご注意";
		}
		navigator.notification.confirm(xAltTxt,oNowpea.confirmAlt,xAltTTl,"EXIT,OK");
	},
		
	/*アラート終了*/	
	confirmAlt:function(xBtnNum){
		//trace(xBtnNum);
		if(xBtnNum == 2){
			oNowpea.startContent();
		}else{
			oNowpea.exitApp();
		}
	},
	
	/*別ブラウザでリンク表示*/
	linkHref:function(xUrl){
		var xChildB = window.plugins.childBrowser;
		xChildB.showWebPage(xUrl);
	}

};



//読み込み監視
document.addEventListener("DOMContentLoaded",oNowpea.initContent);

$(function(){
	oNowpea.initJquely();
});

