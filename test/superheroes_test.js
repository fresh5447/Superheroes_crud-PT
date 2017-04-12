var Superhero = require('../models/superhero');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../server');

chai.use(chaiHttp);



describe('/GET heros', function(){
  it('returns an array for our heros', function(done){
    chai.request(server)
      .get('/api/superheroes')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('array');
        // res.body.length.should.be.eql(2);
        done();
      })
  })
});

describe('/POST hero', function(){
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
