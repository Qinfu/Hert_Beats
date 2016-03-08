
var oStrageIO = function(xKey) {
	this._myStrage = window.localStorage;
	this._keydata = xKey;
}

oStrageIO.prototype = {

	getData:function(){
		var xKey = this._keydata;
		if(xKey && xKey != ""){
			var xLastData = this._myStrage.getItem(xKey);
			xLastData = $.parseJSON(xLastData);
			return xLastData;
		}else{
			this.errorAlt();
		}
	},
	
	savaData:function(xData){
		var xKey = this._keydata;
		if(xKey && xKey != ""){
			xData = JSON.stringify(xData);
			this._myStrage.setItem(xKey,xData);
			trace("Date Saved:"+xKey);
		}else{
			this.errorAlt();
		}
	},

	clearData:function(){
		var xKey = this._keydata;
		if(xKey && xKey != ""){
			this._myStrage.clear();
			trace("Clear Starege:"+xKey);
		}else{
			this.errorAlt();
		}
	},
	
	errorAlt:function(){
		trace("キーデータが設定されていません。");
	}
	
}

