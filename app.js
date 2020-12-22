var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var bicicletasRouter = require('./routes/bicicletas');
var tokenRouter = require('./routes/token');

var bicicletasRouterAPI = require('./routes/api/bicicletas_api_routes');
var usuariosRouterAPI = require('./routes/api/usuarios_api_routes');
var reservasRouterAPI = require('./routes/api/reservas_api_routes');

var app = express();


// Mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/red_bicicletas'

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/bicicletas', bicicletasRouter);
app.use('/token', tokenRouter);



app.use('/api/bicicletas', bicicletasRouterAPI);
app.use('/api/usuarios', usuariosRouterAPI);
app.use('/api/reservas', reservasRouterAPI);

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