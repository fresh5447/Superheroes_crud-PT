var express   = require('express');
var Superhero = require('./models/superhero');
var app       = express();

var mongoose = require('mongoose');

// required to connect to our local database.
// it will look for/ or create a db called superheroes
mongoose.connect("mongodb://localhost/superheroes");


// app.METHOD('URL LOCATION', function(req, res){ handle req/res })

// 'have to go to localhost:3000/test to find this..'
app.get('/test', function(req, res){
  res.send("You found the test route");
});

var superHero1 = {
  name: "Superman",
  superPower: "I can fly!!",
  universe: "DC",
  evil: false,
  rank: 10
};

app.get('/superhero', function(req, res){
  res.json(superHero1);
});

var server = app.listen(3000, function(){
  console.log('Server running 🔥🔥 on PORT 3000');
});
