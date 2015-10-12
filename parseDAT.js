
// this way we access the coords object used to make conversions
eval((new ActiveXObject("Scripting.FileSystemObject")).OpenTextFile("index.js", 1).ReadAll());

function writeTrDatRoMidLine(tStream, lat, longitude, label){
	var val2Write=''

	if (!label) label = 'P' + (tStream.Line - 1);
	if (!lat || !longitude) throw Error('Latitude or longitude were not supplied to write line function.');

	val2Write += label + ', ' + lat + ', ' + longitude;
	tStream.WriteLine(val2Write);
}


function writeTrDatRoFstLine(tStream, PName){

	var val2Write = 'PROIECT: '

	if ( !PName) PName = 'Necunoscut';

	val2Write += PName;
	tStream.WriteLine(val2Write);
}

function writeTrDatRoEndLine(tStream){
	tStream.Write('ENDF');
}

function getTSObject(sFileName, bWrite){
	if (bWrite) {
		return (new ActiveXObject("Scripting.FileSystemObject")).OpenTextFile(sFileName, 8, true, 0);
	} else {
		return (new ActiveXObject("Scripting.FileSystemObject")).OpenTextFile(sFileName, 1, false, 0);
	}
	
}

function getFstAttrib(){
	if(WScript.Arguments.length>=1){
		return WScript.Arguments(0);
	}
	throw Error('Input file name should be provided.');
	return '';
}

function getSecAttrib(){
	if(WScript.Arguments.length>=1){
		if (WScript.Arguments.length>=2) {
			return WScript.Arguments(1);
		} else {
			var tmpStr=WScript.Arguments(0);
			return 'TrDatRo_'+tmpStr;
		}
	}
	throw Error('Input file name should be provided.');
	return '';
}

var sRedFilename = getFstAttrib();
var sWrtFilename = getSecAttrib();
var obTStreamRed = getTSObject(sRedFilename, false);
var obTStreamWrt = getTSObject(sWrtFilename, true);
var myLat,myLng,arrCoords;

writeTrDatRoFstLine(obTStreamWrt, sWrtFilename);
while(!obTStreamRed.AtEndOfStream){
	arrCoords = obTStreamRed.ReadLine().split(/[\s\,\;]+/);
	myLat = coords.toSexagesimal(arrCoords[0], 'blank');
	myLng = coords.toSexagesimal(arrCoords[1], 'blank');
	writeTrDatRoMidLine(obTStreamWrt, myLat, myLng);
}
writeTrDatRoEndLine(obTStreamWrt);
obTStreamWrt.Close();
obTStreamRed.Close();
