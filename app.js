var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var generate_key = require('./routes/generate_key');

var app = express();

// 復号
var password = '12345678901234567890123456789012';// 暗号化のキー
var crypto = require('crypto');
var decipher = crypto.createDecipher('aes192', password);
decipher.update('ed36e4775f264f8563abffc5302586f4', 'hex', 'utf8');// 第一引数が暗号化されたコード
var dec = decipher.final('utf8');

// BASIC 認証
var basicAuth = require('basic-auth-connect');
app.use(basicAuth('hoge', dec));


//decipher.update('94a4b41baacc417b5d5cc7df24bc3891', 'hex', 'utf8');// 第一引数が暗号化されたコード

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/generate_key', generate_key);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
