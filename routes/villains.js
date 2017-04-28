var express = require('express');
var Router  = express.Router();
var async   = require('async');

var Villain = require('../models/villain');

Router.route('/')
  .get(function(req,res){
    Villain.find(function(err, data){
      if (err) {
        res.send(err)
      } else {
        res.json({ message: "Found villains", data });
      }
    });
  })
  .post(function(req,res){
    var villain = new Villain();

    villain.loadPower(req.body.evilPower);
    villain.loadData(req.body);

    villain.save(function(err, data){
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
    async.each(req.body.data, function(villain, cb) {
      var newHero = new Villain();

      newHero.loadPower(villain.superPower);
      newHero.loadData(villain);

      newHero.save()
        .then(function(villain){
          console.log(villain, 'EACH HERO SUCCESS');
          newHeroes.push(villain);
          cb();
        }, function(err){
          if(err) cb(err);
        });
    },function(err) {
        if(err) throw err;
        res.json(newHeroes);
      });
  });


  Router.route('/:villain_id')
    .get(function(req,res){
      Villain.findById(req.params.villain_id, function(err,data){
        if (err) {
          res.send({ err, msg: "Could not find villain with that ID"});
        } else {
          res.json(data);
        }
      });
    })
    .delete(function(req,res){
      Villain.remove({_id: req.params.villain_id}, function(err){
        if (err) {
          console.log(err);
        } else {
          res.send("Bad villain was 💩🛢'd")
        }
      });
    })
    .put(function(req,res){
      Villain.findById(req.params.villain_id, function(err, data){

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
