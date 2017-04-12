var express    = require('express');
    path       = require('path'),
    Superhero  = require('./models/superhero'),
    Villain    = require('./models/villain'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    chalk      = require('chalk'),
    colors     = require('colors'),
    heroRoutes = require('./routes/superheroes');

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



app.get('/api/villains', function(req,res){
  Villain.find(function(err, data){
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

app.use('/api/superheroes', heroRoutes);




app.listen(app.get('port'), () => {
  console.log(chalk.blue("BEGIN COMPUTER STUFF 🤖 BEEEP 🤖 BOOOP 🤖 BOPPPPP 🤖"));
  console.log(`SERVER 🔥🔥🔥🔥 @  http://localhost:${app.get('port')}/`);
  console.log('OMG RAINBOWS!'.rainbow); // rainbow
})

module.exports = app;
