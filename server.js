var express    = require('express');
var path       = require('path');
var Superhero  = require('./models/superhero');
var Villain    = require('./models/villain');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var chalk      = require('chalk');

// required to connect to our local database.
// it will look for/ or create a db called superheroes
mongoose.connect("mongodb://localhost/superheroes");

// We need to create a new resource
// We will need a schema
// make GET all, POST, & DELETE

app.set('port', 3000)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// localhost:3000 will render the index.ejs page.
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/heroes', function(req, res) {
  res.render('goodGuys');
});

app.get('/api/superheroes', function(req,res){ //added /api for backend
  Superhero.find(function(err, data){
    if (err) {
      return res.status(404)
    } else {
      res.json(data);
    }
  });
})

// Returns all villains from the DB
app.get('/api/villains', function(req,res){
  Villain.find(function(err, data){
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});


app.post('/api/superheroes', function(req,res){
  var newSuper = new Superhero();
  
  newSuper.save(function(err,data){
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

// Posts to the villain DB
app.post('/api/villains', function(req,res){
    var newVillain = new Villain({
      name: req.body.name,
      evilPower: req.body.evilPower,
      evil: req.body.evil,
      nemesis: req.body.nemesis
    });
    newVillain.save(function(err,data){
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
});

//added /api for backend
app.get('/api/superheroes/:superhero_id', function(req,res){
  Superhero.findById(req.params.superhero_id, function(err,data){
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

// app.delete

app.delete('/api/superheroes/:superhero_id', function(req,res){
  Superhero.remove({_id: req.params.superhero_id}, function(err){
    if (err) {
      console.log(err);
    } else {
      res.send("Super hero was 💩🛢'd")
    }
  });
});






app.listen(app.get('port'), () => {
  console.log(chalk.blue("BEGIN COMPUTER STUFF 🤖 BEEEP 🤖 BOOOP 🤖 BOPPPPP 🤖"));
  console.log(`SERVER 🔥🔥🔥🔥 @  http://localhost:${app.get('port')}/`);
  console.log('OMG RAINBOWS!'.rainbow); // rainbow
})
