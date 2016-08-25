const express = require('express');



const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Passport = require('passport');

var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/pundoServer');

var routes = require('./routes/index');
var users = require('./routes/users');
var passport = require('./routes/passport');
var dataRouter = require('./routes/dataRouter');


const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( Passport.initialize() );
// Let routes can use the db

// app.use(function(req,res,next){
//     req.db = db;
//     next();
// });

app.use('/', routes);
app.use('/users', users);
app.use('/passport', passport).mongoose;
app.use('/dataRouter', dataRouter).mongoose;



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
