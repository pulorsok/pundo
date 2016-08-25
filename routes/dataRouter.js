var Express = require( 'express' );
var router = Express.Router();
var request = require('request');
var mongoose = require('mongoose');

// mongoose.connect('localhost:27017/pundoServer');



var userSchema = mongoose.Schema({},{collection: "user"});
var sensorSchema = mongoose.Schema({},{collection: "sensor"});
var tagSchema = mongoose.Schema({},{collection: "tag"});

var userModel = mongoose.model('user', userSchema);
var sensorModel = mongoose.model('sensor', sensorSchema);
var tagModel = mongoose.model('tag', tagSchema);

var url = "https://api.mediatek.com/mcs/v2/devices/DX5xg1Kq/datachannels/rfid111/datapoints";


// Add tag
router.get('/get.user', function(req, res) {


  userModel.find({},function(err,docs){
    if(!err)
    res.send(docs);
    console.log(docs);
  })  ;  
  
});
router.get('/get.sensor', function(req, res) {


  sensorModel.find({},function(err,docs){
    if(!err)
    res.send(docs);
    console.log(docs);
  })  ;  
  
});
router.get('/get.tag', function(req, res) {


  tagModel.find({},function(err,docs){
    if(!err)
    res.send(docs);
    console.log(docs);
  })  ;  
  
});


module.exports = router;


