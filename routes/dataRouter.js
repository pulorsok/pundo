var Express = require( 'express' );
var router = Express.Router();
var request = require('request');
var mongoose = require('mongoose');
mongoose.connect('mongodb://pulorsok:pock84831@163.18.44.130:27017/pundoServer')
// mongoose.connect('lomongoose.connect('mongodb://pulorsok:pock84831@163.18.44.130:27017/test')calhost:27017/pundoServer');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database Connected.");
});


var userSchema = mongoose.Schema({
  _id: Object,
  user_name: String,
  user_password: String,
  sensor: Array,
  tag: Array,
  sensor_count: Number,
  tag_count: Number
},{collection: "user"});
var sensorSchema = mongoose.Schema({
  _id: Object,
  tag: Array,
  tag_count: Number,
  order: String,
  date: Date,
  location: String,
  sensor_name: String
},{collection: "sensor"});
var tagSchema = mongoose.Schema({},{collection: "tag"});

var userModel = mongoose.model('user', userSchema);
var sensorModel = mongoose.model('sensor', sensorSchema);
var tagModel = mongoose.model('tag', tagSchema);

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
  

  userModel.findOne({user_name: "admin"},function(err,docs){
    // res.json({sensor: docs.sensor, tag: docs.tag});
    res.send(docs);
  })
 
});

router.get('/get.SensorTagRelation', function(req, res){
  
  userModel.findOne({user_name:"admin"}, function(err,docs){
    var sensor = docs.sensor;
    makeSensorTagRelationJson(sensor,function(response){
      console.log('callback');
      res.json(response);
    })
    
  })
  
  

});
// Add tag
router.get('/get.user', function(req, res) {

  
  
  userModel.find({user_name: req.query.user},function(err,docs){
    if(!err)
    res.json(docs);
    else
      console.log("user error")

    //console.log(req);
  });  
  
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


module.exports = router;


