var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log('CHECK home page start');

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
