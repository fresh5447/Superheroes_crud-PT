var Superhero = require('../models/superhero');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../server');
var colors = require('colors')

chai.use(chaiHttp);

describe('/GET'.rainbow, function(){
  it('returns all heroes from database', function(done){
    chai.request(server)
      .get('/api/superheroes')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('We found your heroes!!');
        res.body.data.should.be.a('array');
        done();
      })
  })
});

describe('/POST NEW HERO', function(){
  it('should not POST hero without a name', function(done) {

    var hero = {
      evil: false,
      alias: "billy bob"
    }

    chai.request(server)
      .post('/api/superheroes')
      .send(hero)
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('name');
        res.body.errors.name.should.have.property('kind').eql('required');
        done();
      })
  });

  it('should POST a hero', function(done) {

    var hero = {
      name: "Batman",
      superPower: 'I am rich',
      superPower: 'I am a bat',
      alias: "Bruce Wayne",
      evil: false,
      rank: 10,
      img: "https://upload.wikimedia.org/wikipedia/en/1/17/Batman-BenAffleck.jpg"
    }

    chai.request(server)
      .post('/api/superheroes')
      .send(hero)
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Hero successfully added!');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('superPowers');
        res.body.data.superPowers.should.be.a('array');
        done();
      })

  })

});

describe('GET HERO BY ID', function(){
  it('it should get HERO by ID', function(done){
    var hero = new Superhero({
      name: "Batman",
      superPower: 'I am rich',
      superPower: 'I am a bat',
      alias: "Bruce Wayne",
      evil: false,
      rank: 10,
      img: "https://upload.wikimedia.org/wikipedia/en/1/17/Batman-BenAffleck.jpg"
    });

    hero.save(function(err, hero) {
      chai.request(server)
        .get('/api/superheroes/' + hero._id)
        .send(hero)
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name')
          done();
        })
    })

  })

  it('will not break without ID', function(done){
    chai.request(server)
      .get('/api/superheroes/23423')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('msg');
        res.body.should.have.property('msg').eql('Could not find hero with that ID');
        done();
      })
  });
});

describe('EDIT A HERO', function() {
  it('I can update a hero, given i have the id', function(done) {
    var hero = new Superhero({ name: "AAquaman" })
    hero.save(function(err, hero) {
      chai.request(server)
      .put('/api/superheroes/' + hero._id)
      .send({name: "Aquaman"})
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Hero updated!');
        res.body.data.should.have.property('name').eql('Aquaman');
        done();
      })
    })
  })
})

describe('DELETE A HERO', function(){
  it('Can delete a hero by id', function(done){
    var hero = new Superhero({ name: "Blueman" })
    hero.save(function(err, hero) {
      chai.request(server)
        .delete('/api/superheroes/' + hero._id)
        .end(function(err, res){
          res.should.have.status(200);
          done();
        })
    })
  })
});
