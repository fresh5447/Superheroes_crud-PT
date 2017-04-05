var Superhero = require('../models/superhero');

// Render home page
exports.index = function(req, res){
  res.render('index');
};

// Fetch all SUPERHEROES
exports.all = function(req, res){
  Superhero.find(function(err, heroes){
    if(err){
      res.status(500).send(err);
    } else {
      res.json(heroes);
    }
  });
};

// Fetch One SUPERHEROES
exports.one = function(req, res){
  Superhero.findById(req.params.id, function(err, hero){
    if (!hero) return res.status(404);
    if(err){
      res.status(500).send(err);
    } else {
      res.json(hero);
    }
  });
};

// Update a SUPERHERO
exports.update = function(req, res){
  Superhero.findById(req.params.id, function(err, hero){

    if (!hero) return res.status(404);

    console.log("EDITING SUPER HEO")

    hero.name       = req.body.name ? req.body.name : hero.name;
    hero.superPower = req.body.superPower ? req.body.superPower : hero.superPower;
    hero.universe   = req.body.universe ? req.body.universe : hero.universe;
    hero.rank       = req.body.rank ? req.body.rank : hero.rank;
    hero.imageUrl   = req.body.imageUrl ? req.body.imageUrl : hero.imageUrl;

    hero.save(function(er){
      if (er) {
        return res.status(500);
      } else {
        res.json(hero)
      }
    })

  })
}

// Create a SUPERHERO
exports.create = function(req, res){
  var newSuper = new Superhero({
    name:       req.body.name,
    superPower: req.body.superPower,
    universe:   req.body.universe,
    evil:       req.body.evil,
    rank:       req.body.rank,
    imageUrl:   req.body.imageUrl,
  });
  newSuper.save(function(err, hero){
    if(err){
      res.status(500).send(err);
    } else {
      res.json(hero)
    }
  });
};

exports.remove = function(req, res){
  Superhero.remove({ _id: req.params.id }, function(err) {
    if(err){
      res.status(500).send(err);
    } else {
      res.send("Hero deleted!")
    }
  })
};
