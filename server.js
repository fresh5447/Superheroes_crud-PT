var express    = require('express');
    path       = require('path'),
    Superhero  = require('./models/superhero'),
    Villain    = require('./models/villain'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    chalk      = require('chalk'),
    colors     = require('colors');

mongoose.connect("mongodb://localhost/superheroes");

app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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
  var newSuperHero = new Superhero();

  newSuperHero.loadPower(req.body.superPower);
  newSuperHero.loadData(req.body);

  newSuperHero.save(function(err, data){
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });

});

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

app.put('/api/villains/:villain_id', function(req,res){
  Villain.findById(req.params.villain_id, function(err, vil){
    if(err) return err
    vil.loadPower(req.body.evilPower);
    vil.loadData(req.body);
    vil.save(function(e){
      if(e) return e
      res.json(vil);
    });
  });
});

app.get('/api/superheroes/:superhero_id', function(req,res){
  Superhero.findById(req.params.superhero_id, function(err,data){
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.put('/api/superheroes/:superhero_id', function(req,res){
  Superhero.findById(req.params.superhero_id, function(err, hero){

    if(err) return err

    hero.loadPower(req.body.superPower);
    hero.loadData(req.body);

    hero.save(function(e){
      if(e) return e
      res.json(hero)
    })

  })
});

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
