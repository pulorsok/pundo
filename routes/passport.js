var Passport = require( 'passport' );
var Express = require( 'express' );
var localStrategy = require('passport-local').Strategy;
var router = Express.Router();
var request = require('request');
var mongoose = require('mongoose');
// mongoose.connect('localhost:27017/pundoServer');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//   console.log("Database Connected.");
// });
var usersch = require('../userSch');

var url = "https://api.mediatek.com/mcs/v2/devices/DX5xg1Kq/datachannels/rfid111/datapoints";
var collection = null;
var test = "jhvjgjg" ; 

var localStrategy = new localStrategy({
	   usernameField: 'username',
     passwordField: 'password',
},function(username, password, done) {
        usersch.findOne({ 'user_name': username }, function (err, user) {
        	
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user['user_password'] !== password ){
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
  );
router.post('/authenticate',Passport.authenticate( 'local', { session: false } ),
  function( req, res ) {
  	console.log('post start');
    res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Logged in!" });
    

    
  }
);

router.get('/', function(req, res) {
  console.log('get start');
	usersch.findOne({'user_name' : 'admin'},function(err,docs){
		if(!err)
		res.send(docs);
	})  ;  
    
});





// request(url, function (error, response, body) {
//   if (!error) {

//     var $ = body;
//     // 輸出
//     console.log(body);
//   } else {
//     console.log("擷取錯誤：" + error);
//   }
// });

Passport.use( 'local', localStrategy );

module.exports = router ;


