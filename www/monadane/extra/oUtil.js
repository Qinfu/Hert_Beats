
var oUtil ={
	getParamArgs:function (){
		//GETパラメータの取得
		var xResArray = null;
		var xQuery = window.location.search.substring(1);
		var xGetDatas = xQuery.split('&');
		if (xGetDatas.length >0){
			for (var i=0; i<xGetDatas.length; i++) {
				var xPos = xGetDatas[i].indexOf('=');
				if (xPos > 0) {
					var xKey = xGetDatas[i].substring(0,xPos);
					var xValue = xGetDatas[i].substring(xPos+1);
					xValue = decodeURI(xValue);
					xResArray[xKey] = xValue;
				}
			}
		}
		return xResArray;
	},
	
	chkPlatform:function(){
		var xRes = "PC";
		if (navigator.userAgent.indexOf('Android') > 0){
			
			if (navigator.userAgent.indexOf('Mobile') <= 0 || navigator.userAgent.indexOf('SC-01C') > 0){
				xRes = "AndroidPad";
			}else{
				xRes = "Android";
			}
			
		}else if (navigator.userAgent.indexOf('iPhone') > 0){
			xRes = "iPhone";
		}else if(navigator.userAgent.indexOf('iPad') > 0){
			xRes = "iPad";
		}else if(navigator.userAgent.indexOf('iPod') > 0){
			xRes = "iPod";
		}
	return xRes;
	}
}



function trace(xTxt){
	//alert(">>" + xTxt);
	console.log(">>" + xTxt); 
}


//【予約語拡張】------------------------------------------//

/*
 数字に3桁ごとにカンマ追加（Math 拡張）
 	>> Math.addComma(数値)
 */
Math.addComma = function(xNum){ 
	return String(xNum).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' );
}

/*
 配列シャッフル（Array 拡張）
 	>> 配列.shuffle()

Array.prototype.shuffle = function() {
    var i = this.length;
    while(i){
        var j = Math.floor(Math.random()*i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}
 */
 
/*
 文字列置換（String 拡張）
 	>> 変換前文字列.replaceAll("置換前文字","置換後文字");
 */

String.prototype.replaceAll = function (org, dest){  
	return this.split(org).join(dest);  
}
