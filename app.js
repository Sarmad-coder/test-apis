const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
// var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var carRouter = require('./routes/car');

var app = express();

mongoose
  .connect("mongodb+srv://sarmadawan35:DtNplVTmaWuQdS9S@mycluster.cytjjkg.mongodb.net/testDb")
  .then(() => console.log('Mongodb connected'))
  .catch((error) => {
    console.log('Mongodb connection failed. exiting now...');
    console.error(error);
    process.exit(1);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// app.use('/', (req, res, next)=>{
//   res.json("Api is running")
// })
app.use('/user', userRouter);
app.use('/car', carRouter);
carRouter

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
