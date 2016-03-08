/*****************************
 * 鼓動データ管理
 *****************************/

var oBeatData = {
	pBeatList:[
		{_name:["Human","人間"],_icon:"man13",_beat:60},
		{_name:["Woman in Love","恋愛中の女性"],_icon:"girl47",_beat:95},
		{_name:["Small Dog","小型犬"],_icon:"small163",_beat:100},
		{_name:["Midium Dog","中型犬"],_icon:"dog77",_beat:90},
		{_name:["Large Dog","大型犬"],_icon:"dog53",_beat:75},
		{_name:["Cat","猫"],_icon:"halloween237",_beat:150},
		{_name:["Rat","ネズミ"],_icon:"rat2",_beat:450},
		{_name:["Rabbit","ウサギ"],_icon:"rabbit5",_beat:205},
		{_name:["Monkey","猿"],_icon:"monkey3",_beat:190},
		{_name:["Chiken","鶏"],_icon:"chick2",_beat:275},
		{_name:["Pig","豚"],_icon:"pig4",_beat:70},
		{_name:["Cow","牛"],_icon:"cow9",_beat:65},
		{_name:["Horse","馬"],_icon:"horse123",_beat:44},
		{_name:["Elephant","象"],_icon:"elephant6",_beat:30},
		{_name:["Graffe","キリン"],_icon:"giraffe8",_beat:65},
		{_name:["Large Whale","クジラ"],_icon:"whale",_beat:20}
	],
	
/*
.flaticon-man13
.flaticon-girl47
.flaticon-small163
.flaticon-dog53
.flaticon-dog77
.flaticon-halloween237
.flaticon-rat2
.flaticon-rabbit5
.flaticon-monkey3
.flaticon-chick2
.flaticon-pig4
.flaticon-cow9
.flaticon-horse123
.flaticon-elephant6
.flaticon-giraffe8
.flaticon-whale

.flaticon-gymnast5
.flaticon-heart378
*/

	updateList:function(xMyBeat){
		this.pBeatList[0]._beat = Number(xMyBeat);
		this.pBeatList[1]._beat = Number(xMyBeat) + 35;
		return true;
	},
	
	getNameList:function(xType){
		var xRes = [];
		for (var i=0; i<this.pBeatList.length; i++){
			if (xType == "jp"){
				xRes.push(this.pBeatList[i]._name[1]);
			}else{
				xRes.push(this.pBeatList[i]._name[0]);
			}
		};
		return xRes;
	},
	
	getBratList:function(xId){
		var xTgBeat = this.pBeatList[xId]._beat;
		var xTgLength = (1000*60)/xTgBeat;
		
		var xHeatMotion = Math.round(xTgLength/2);
		xHeatMotion =Math.min(xHeatMotion,500);
		var xHeatStay =  Math.round(xTgLength - xHeatMotion);
		
		/*
		trace("xTgBeat=" + xTgBeat);
		trace("xTgLength=" + xTgLength);
		trace("xHeatMotion=" + xHeatMotion);
		trace("xHeatStay=" + xHeatStay);
		*/
		
		var xRes = [];
		for (var i=0; i<xTgBeat; i++){
			xRes.push(xHeatMotion);
			xRes.push(xHeatStay);
		};
		return xRes;
	}
	
};
