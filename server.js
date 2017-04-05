'use strict';

const path     = require('path');
var express    = require('express');
var Superhero  = require('./models/superhero');
var app        = express();
var bodyParser = require('body-parser');
const routes   = require('./controllers/routes');
const morgan   = require('morgan')

var mongoose   = require('mongoose');
mongoose.connect("mongodb://localhost/superheroes");

// Configure view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure middleware
app.use(morgan('combined'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Static file serving
app.use(express.static('public'));

app.get('/heroes', function(req, res){
  res.render('goodGuys');
});

app.get('/villains', function(req, res){
  res.render('badGuys');
});


// Mount application routes
routes(app);

var server = app.listen(3000, function(){
  console.log(`🔥🔥🔥  @ http://localhost:3000/`);
});
