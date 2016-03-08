
var oBaseController ={
	_topPage:"#top",
	_curentPageId:"",
	
	initContent:function(){
		oBaseController._curentPageId = "#" + $(".current").attr("id");
		//alert(this._lastPageId);
		
		//アクションバー初期化
		oActionBar.initActionBar();

		$('a[href*=#]').on("click",oActionBar.linkTouchEnd);
		$("#mainContent a").on("click",oBaseController.snatchHrefAct);
	},
	
	/*アプリ終了前処理*/
	beforeExitApp:function(evt){
	 	$('a[href*=#]').off("click");
	 	$("#mainContent a").off("click");
	 	$("body").trigger(oEvent.APP_EXIT);
	},

	
	/*画面切り替え*/
	changePage:function(xId){
		//alert(xId);
		if(xId != oBaseController._curentPageId){
			$("body").trigger(oEvent.CHANGE_PAGE,[xId]);
			//alert(oBaseController._lastPageId);
			$(oBaseController._curentPageId).removeClass("current");
			$(xId).addClass("current");
			//$(xId).addClass("animated flipInY");
			oBaseController._curentPageId = xId;
		}
	},
	
	/*戻るボタン（ハードキー）アクション*/
	onBuckButton:function (){
		//onBuckbuttonAct();
		if(oBaseController._curentPageId == oBaseController._topPage){
			//インデックスなら、終了
			oNowpea.exitApp();
		}else{
			var xTgNavHref = $(oBaseController._curentPageId).find("a.icon-Prev").attr("href");
			
			//インデックス以外のページなら、前のページへ戻す
			oBaseController.changePage(xTgNavHref);
		}
	},

	
	/*外部リンク処理変換*/
	snatchHrefAct:function (evt){
		var xHref = $(this).attr("href");
		if (xHref.indexOf("http") >= 0){
			evt.preventDefault();
			oNowpea.linkHref(xHref);
			return false;
		}else{
			return true;
		}
	}
	
};


function trace(xTxt){
	//alert(">>" + xTxt);
	console.log(">>" + xTxt); 
}

