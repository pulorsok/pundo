var express = require('express');
var router = express.Router();
var app = require('../app');
var mongoose = require('mongoose');
var request = require('request');


var gcm = require('node-gcm');



var message = new gcm.Message({
    data: { message: 'msg1' }
});

// Set up the sender with you API key, prepare your recipients' registration tokens.
var sender = new gcm.Sender('AIzaSyB1GPbCvYhdnOZe1jm4_slWC22aILOPOys');
var regTokens = ['d7ubUOT7ZUg:APA91bGSxVZXbgcFOOXKhMrbmK96KG5qBXOGmOM9VX2jp7qu4zSPaDl0q2DZlIkofOhYgnKcW35tFCjQ9YjOnFFxgqPt2SCuic_Kj9EmprYnGbCqCvR04nrOk6IYkQrsNIAcwN79b045'];

var userModel = require('../userSch.js');
var sensorModel = require('../sensorSch.js');
var tagModel = require('../tagSch.js');

var tags = [];
var strTemp = null;
var sensorTimeOutCheck = true; 
var tagCount = 0;
var timeOut = null;

function sameCheck(tag, callback){
     tags.push(tag);
     
     tags.forEach(function(str){
        
        //console.log("str = " + str)
        //console.log("strteom = " + strTemp)
        if(!(strTemp == str)){
            tagCount++;
        }
        strTemp = str;
     })
    
     callback();
}

function compareTagId(id,con){
    
    //console.log("id: " + id);
    tagModel.findOne({tagId: id},function(err,docs){

        //console.log("sd");
        //console.log("docs : " + docs);
        if(docs){
            console.log(docs);
            console.log("ya");
            if(!timeOut)
                timeOut = setTimeout(function() {
                        sensorTimeOutCheck = true;
                        console.log("setTimeout : " + con);
                        clearTimeout(timeOut);
                        tagCount = 0;
                        tags = [];
                        strTemp = null;
                    }, 20000);
            if(!err && sensorTimeOutCheck ){
            //var obj = Object.keys(docs);
                
                sameCheck(id, function(){
                    console.log(tagCount);
                    if(tagCount >= 2){
                        sensorTimeOutCheck = false;
                        sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                            if(err)  
                            console.error(err);
                            else    
                            console.log("send: " + response);
                                
                        });
                    }
                });   
            }
        }else 
            console.log("not found");

             

    })

}



/* GET home page. */
router.get('/', function(req, res, next) {
  request({
    url: "https://api.mediatek.com/mcs/v2/devices/DX5xg1Kq/datachannels/rfid111/datapoints",
    method: "GET"
  }, function(e,r,b) { /* Callback 函式 */
    if(!e) {
      var obj = JSON.parse(b)
      var datap = obj.dataChannels[0].dataPoints[0].values.value;
      var dataC = datap.replace(/(\r\n|\n|\r)/gm,"");
      var arr = dataC.split(",")
      var id = arr[1];
      //console.log("out: " + arr[0] + "  id: " + arr[1]);
      compareTagId(id,arr[0]);

      //console.log(dataC);  
    }
  });
  

});

module.exports = router;
