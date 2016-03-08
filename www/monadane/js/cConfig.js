var cConfig = {
	
	pKey:"pitdrops",
	
	_lastData:new oStrageIO("pitdrops"),
	
	loadConfig:function(){
		var xLastData = cConfig._lastData.getData();
		//cConfig._lastData.clearData();
		//xLastData = null;
		if (!xLastData){
			
			xLastData = new Object();
			xLastData.updateSec = "1";
			xLastData.timeZone = "0";
			//xLastData.timeShift = "0";
			cConfig._lastData.savaData(xLastData);
		}
		return (xLastData);
	},
	
	saveConfig:function(xData){
		cConfig._lastData.savaData(xData);
	}
}
