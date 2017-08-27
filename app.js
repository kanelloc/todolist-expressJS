var express =   require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var passport        = require('passport');
var session             = require('express-session');

mongoose.connect('mongodb://localhost/todolist');
let db = mongoose.connection;

//Check connection
db.once('open', function () {
    console.log('Connected to MongoDB');
})

//Check for db errors
db.on('error', function(err){
    console.log(err);
});

//Init app.
var app=express();

//Bring in Models
let Item = require('./models/item');
let User = require('./models/user');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Express-Validator
app.use(expressValidator());
// Passport
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

// Home Route
app.get('/', function(req, res){
  res.render('index',
    {
        title: 'Test 2'
    });
});

// Route Files
let todolist = require('./routes/todos');
app.use('/todolist', todolist);

let auth = require('./routes/auth');
app.use('/auth', auth);

// Start Server
app.listen(3000, function () {
    console.log('Server started on port 3000....')
});