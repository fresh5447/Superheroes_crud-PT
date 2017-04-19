var express = require('express');
var Router  = express.Router();
var async   = require('async');

var Superhero = require('../models/superhero');

Router.route('/')
  .get(function(req,res){
    Superhero.find(function(err, data){
      if (err) {
        res.send(err)
      } else {
        res.json({ message: "Found heroes", data });
      }
    });
  })
  .post(function(req,res){
    var hero = new Superhero();

    hero.loadPower(req.body.superPower);
    hero.loadData(req.body);

    hero.save(function(err, data){
      if(err){
        res.send(err);
      } else {
        res.json({ data, message: "Hero successfully added!" });
      }
    })
  });

Router.route('/multiple')
  .post(function(req,res){
    var newHeroes = [];
    async.each(req.body.data, function(hero, cb) {
      var newHero = new Superhero();

      newHero.loadPower(hero.superPower);
      newHero.loadData(hero);

      newHero.save()
        .then(function(hero){
          console.log(hero, 'EACH HERO SUCCESS');
          newHeroes.push(hero);
          cb();
        }, function(err){
          if(err) cb(err);
        });
    },function(err) {
        if(err) throw err;
        res.json(newHeroes);
      });
  });


  Router.route('/:superhero_id')
    .get(function(req,res){
      Superhero.findById(req.params.superhero_id, function(err,data){
        if (err) {
          res.send({ err, msg: "Could not find hero with that ID"});
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
      Superhero.findById(req.params.superhero_id, function(err, data){

        if(err) res.send(err)

        if(req.body.superPower) {
          data.loadPower(req.body.superPower);
        }


        data.loadData(req.body);

        data.save(function(err){
          if(err) res.send(err)
          res.json({ data, message: 'Hero updated!'});
        })

      })
    });

module.exports = Router;
