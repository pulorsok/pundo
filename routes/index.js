var express = require('express');
var router = express.Router();
var app = require('../app');
var io = require('socket.io').listen(app);

io.on("connection", function (socket) {  
    var tweet = {user: "nodesource", text: "Hello, world!"};

    // to make things interesting, have it send every second
    var interval = setInterval(function () {
        socket.emit("tweet", tweet);
    }, 1000);

    socket.on("disconnect", function () {
        clearInterval(interval);
    });
    socket.on("tweet", function (tweet) {
        // we received a tweet from the browser
        console.log("sdasdasd");
        console.log("tweet from", tweet.username);
    console.log("contents:", tweet.text);
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  
  console.log('CHECK home page start');
  console.log(req);

});
// router.get('/passport', function(req,res){
// 	var db = req.db;
//     var collection = db.get('user');
//     collection.find({},{},function(e,docs){
//         res.render('passport', {
//             "passport" : docs
//         });
//         console.log(docs);
//     });
// })
// router.post('/', function(req, res){

// 	// authentication parament
// 	var Account = req.body.account;
// 	var Password = req.body.password;

// 	console.log('account = ' + Account + ' , ' + 'password = ' + Password);

// });

module.exports = router;
