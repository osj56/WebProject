var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var mongoose   = require('mongoose');
var passport = require('passport');
var configAuth = require('./config/auth');
var sassMiddleware = require('node-sass-middleware');
var routes = require('./routes/index');
var users = require('./routes/users');
var routeAuth = require('./routes/auth');
var posts = require('./routes/posts');
var books = require('./routes/books');
var passport = require('passport');
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}
app.locals.moment = require('moment');
app.locals.querystring = require('querystring');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tpwjd9494:tpwjd94@ds125716.mlab.com:25716/osj56',{useMongoClient: true});
mongoose.connection.on('error', console.log);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method', {methods: ['POST', 'GET']}));

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, 
  debug: true,
  sourceMap: true
}));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'long-long-long-secret-string-1313513tefgwdsvbjkvasd'
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, '/bower_components')));


app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);
app.use(function(req, res, next) {
  console.log("REQ USER", req.user);
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

configAuth(passport);

app.use('/', routes);
app.use('/users', users);
app.use('/posts', posts);
app.use('/books', books);
routeAuth(app, passport);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
