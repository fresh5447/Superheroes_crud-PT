var mongoose = require('mongoose');

var SuperheroSchema = new mongoose.Schema({
  name: String,
  superPower: Array,
  universe: String,
  evil: Boolean,
  rank: Number,
  img: String
});

SuperheroSchema.methods.loadData = function(data) {
  this.name       = data.name ? data.name : this.name;
  this.superPower = data.superPower ? data.superPower : this.superPower;
  this.universe   = data.universe ? data.universe : this.universe;
  this.evil       = data.evil ? data.evil : this.evil;
  this.rank       = data.rank ? data.rank : this.rank;
}

module.exports = mongoose.model('Superhero', SuperheroSchema);
