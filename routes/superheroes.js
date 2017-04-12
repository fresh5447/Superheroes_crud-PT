var express = require('express');
var Router = express.Router();
var Superhero = require('../models/superhero');

Router.route('/')
.get(function(req,res){ //added /api for backend
  Superhero.find(function(err, data){
    if (err) {
      return res.status(404)
    } else {
      res.json(data);
    }
  });
})
.post(function(req,res){
  var newSuperHero = new Superhero();

  newSuperHero.loadPower(req.body.superPower);
  newSuperHero.loadData(req.body);

  newSuperHero.save(function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.json({message: "Hero successfully added!", data });
    }
  });

});

Router.route('/:superhero_id')
  .get(function(req,res){
    Superhero.findById(req.params.superhero_id, function(err,data){
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  })
.delete(function(req,res){
  Superhero.remove({_id: req.params.superhero_id}, function(err){
    if (err) {
      console.log(err);
    } else {
      res.send("Super hero was 💩🛢'd")
    }
  });
})
.put(function(req,res){
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

module.exports = Router;