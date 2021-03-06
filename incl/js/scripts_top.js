
//Overrides JSON.stringify to support associative arrays
(function(){
    // Convert array to object
    var convArrToObj = function(array){
        var thisEleObj = new Object();
        if(typeof array == "object"){
            for(var i in array){
                var thisEle = convArrToObj(array[i]);
                thisEleObj[i] = thisEle;
            }
        }else {
            thisEleObj = array;
        }
        return thisEleObj;
    };
    var oldJSONStringify = JSON.stringify;
    JSON.stringify = function(input){
        if(oldJSONStringify(input) == '[]')
            return oldJSONStringify(convArrToObj(input));
        else
            return oldJSONStringify(input);
    };
})();


function generateAppQrCode(data) {
	var qr = qrcode(0, 'M');
    qr.addData(JSON.stringify(data));
    qr.make();
    document.getElementById('placeHolder').innerHTML = qr.createImgTag(8,5);
}


function updateQrCode() {
	var qrData =[];
	qrData["issetup"] = true;
	qrData["url"] = document.getElementById("qr_url").value;
	qrData["key"] = document.getElementById("qr_key").value;
	generateAppQrCode(qrData);
}