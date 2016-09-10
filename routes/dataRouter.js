var Express = require( 'express' );
var router = Express.Router();
var request = require('request');
var mongoose = require('mongoose');
var gcm = require('node-gcm');



var message = new gcm.Message({
    data: { key1: 'msg1' }
});

// Set up the sender with you API key, prepare your recipients' registration tokens.
var sender = new gcm.Sender('AIzaSyB1GPbCvYhdnOZe1jm4_slWC22aILOPOys');
var regTokens = ['cue3LQE_dRk:APA91bEJLWLlb0rlZhKa8VWGfIbWwZf5dOt1Duk13pb9ZskyzDs0Rv1cSF-8L2M0i4mS9a4YfdjRU_dKakUUbtSxyXq32fJPSYzfMApqelMa0nAiv6DG8YxKhZJ6ebyHvkzqdeios6rX'];

// sender.send(message, { registrationTokens: regTokens }, function (err, response) {
//     if(err) console.error(err);
//     else    console.log(response);
// });




//mongoose.connect('mongodb://pulorsok:pock84831@163.18.44.130:27017/pundoServer')
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function callback () {
//  console.log("Database Connected.");
//});


//var userSchema = require('../userSch.js')


var userModel = require('../userSch.js');
var sensorModel = require('../sensorSch');
var tagModel = require('../tagSch.js');

var url = "https://api.mediatek.com/mcs/v2/devices/DX5xg1Kq/datachannels/rfid111/datapoints";
var initJson = null;
var userJson = null;
var sensorJson = null;
var tagJson = null;



// make sure it excute after foreach
function makeSensorTagRelationJson(sensorName,callback){
  var count = 0;
  var responseJson= [];
  sensorName.forEach(function(name){
      sensorModel.findOne({sensor_name: name}, function(err,docs){
        count++;
        var obj = {};
        obj[name] = docs.tag;
        responseJson.push(obj);
        console.log("forEach");
        console.log("sensorName length : " + sensorName.length);
        console.log("count : " + count);

        // use simple counter to check foreach done
        if(count === sensorName.length){
          callback(responseJson);
        }
        
      })
    })
}

// post init data
router.get('/', function(req, res){
  

  userModel.findOne({user_name: req.query.user},function(err,docs){
    // res.json({sensor: docs.sensor, tag: docs.tag});
    res.json(docs);
  })

  
});

router.get('/get.SensorTagRelation', function(req, res){
  
  userModel.findOne({user_name: req.query.user}, function(err,docs){
    var sensor = docs.sensor;
    makeSensorTagRelationJson(sensor,function(response){
      console.log('callback');
      res.json(response);
    })
    
  })
  
  

});
// Add Sensro
router.get('/add.sensor', function(req, res){

})
// Add tag
router.get('/add.tag', function(req, res) {

  
  
  
  
});


router.get('/get.Sensor-User', function(req, res) {


  
  console.log(req.query.user);
  sensorModel.find({order: req.query.user},function(err,docs){
    if(!err)
    res.send(docs);
    else
      console.log("sensor error");
  console.log(docs);
  //console.log(res);
    //console.log(req);
  })  ;  
  
});
router.get('/get.Tag-User', function(req, res) {

 
  
  tagModel.find({oreder_user: req.query.user},function(err,docs){
    if(!err)
    res.json(docs);
  else
    console.log("tag error");
    //console.log(req);
  })  ;  
  
});



router.get('/test', function(req,res){
  tagModel.findOne({tag_name: "tag_001"},function(err,docs){
    if(docs){
      console.log(docs.tagId);
      var timeOut = setTimeout(function(str1, str2) {
        console.log(str1 + " " + str2);
        clearTimeout(timeOut);
      }, 3000, "Hello.", "How are you?");

    //var obj = JSON.parse(docs);
    
    
    }
    res.send(docs);
  });
})
//





module.exports = router;


