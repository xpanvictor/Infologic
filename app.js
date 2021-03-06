
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}


var createError       = require('http-errors');
var express           = require('express');
var path              = require('path');
var expresslayout     = require('express-ejs-layouts');
var cookieParser      = require('cookie-parser');
var logger            = require('morgan');
var mongoose          = require('mongoose');
const passport        = require('passport');
const session         = require('express-session');
const flash           = require('express-flash');
const bodyParser      = require('body-parser')
const app = express();

const initializepassport = require('./passportConfig');
initializepassport(passport);

mongoose.connect('mongodb+srv://Admin:PisOZpf0xuesY5Fs@cluster0.9zycx.mongodb.net/blog?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
// Mongoose local conection
// mongoose.connect('mongodb://localhost:27017/blog?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())
// Node modules
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(expresslayout);

app.set('layout layout', true);
app.set('layout error', false);
app.set('layout plain', false);
// Passport
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var blogRouter = require('./routes/blog');
var sectionRouter = require('./routes/section');
var userRouter = require('./routes/user');
var authorRouter = require('./routes/author');
var apihandler = require('./routes/apihandler');

app.use('/', blogRouter);
app.use('/users', userRouter);
app.use('/authors', authorRouter);
app.use('/sections', sectionRouter);
app.use('/api', apihandler);

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
  res.render('error', {title: "error"});
});


module.exports = app;
