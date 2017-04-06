var express    = require('express');
var path       = require('path');
var Superhero  = require('./models/superhero');
var Villain    = require('./models/villain');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// required to connect to our local database.
// it will look for/ or create a db called superheroes
mongoose.connect("mongodb://localhost/superheroes");

// We need to create a new resource
// We will need a schema
// make GET all, POST, & DELETE

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// tells express our client side (static) code
// is going to live in the public folder
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// localhost:3000 will render the index.ejs page.
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/heroes', function(req, res) {
  res.render('goodGuys', { data: "HELLOOOO" });
});

app.get('/api/superheroes', function(req,res){

  Superhero.find(function(err, data){
    if(err){
      console.log(err);
    } else {
      res.json(data);
    }
  });

});

app.post('/api/superheroes', function(req, res){
  var newSuper = new Superhero({
    name:       req.body.name,
    superPower: req.body.superPower,
    universe:   req.body.universe,
    evil:       req.body.evil,
    rank:       req.body.rank,
  });
  newSuper.save(function(err, sh){
    if(err){
      console.log(err)
    } else {
      res.json(sh)
    }
  });
})

app.get('/api/superheroes/:superhero_id', function(req, res) {
  Superhero.findById(req.params.superhero_id, function(err, data){
    if(err){
      console.log(err);
    } else {
      res.json(data);
    }
  })
});

// app.delete
app.delete('/api/superheroes/:superhero_id', function(req, res){

  Superhero.remove({ _id: req.params.superhero_id }, function(err) {
    if(err){
      console.log(err);
    } else {
      res.send("Super hero deleted! 👾");
    }
  });

});

// app.put







var server = app.listen(3000, function(){
  console.log('Server running 🔥🔥 on PORT 3000');
});
