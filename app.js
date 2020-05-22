const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectDatabase = require('./helpers/database/db')


const index = require('./routes/index');
const movie = require('./routes/movie');
const director = require('./routes/director');

var PORT = process.env.PORT || 5000;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// MongoDb Connection
connectDatabase();

//Middleware
const verifyToken = require('./middleware/verif-token')

// Config
const config = require('./config')
app.set('api_secret_key', config.api_secret_key)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', verifyToken);
app.use('/api/movies', movie);
app.use('/api/directors', director);


// catch 404 and forward to error handler
app.use((req, res, next) => {
     const err = new Error('Not Found');
     err.status = 404;
     next(err);
});

// error handler
app.use((err, req, res, next) => {
     // set locals, only providing error in development
     res.locals.message = err.message;
     res.locals.error = req.app.get('env') === 'development' ? err : {};

     // render the error page
     res.status(err.status || 500);
     res.json({ error: { message: err.message, code: err.code } });
});

app.listen(PORT, ()=> {
     console.log(`Server is listening on ${PORT}`) 
 });

 module.exports = app;