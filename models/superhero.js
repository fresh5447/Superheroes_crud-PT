var mongoose = require('mongoose');

var SuperheroSchema = new mongoose.Schema({
  name:        { required: true, type: String },
  superPowers: [{ type: String }],
  universe:    String,
  alias:       String,
  evil:        Boolean,
  rank:        Number,
  img:         String
});

SuperheroSchema.methods.loadData = function(data) {
  this.name     = data.name ? data.name : this.name;
  this.alias    = data.alias ? data.alias : this.alias;
  this.universe = data.universe ? data.universe : this.universe;
  this.evil     = data.evil ? data.evil : this.evil;
  this.rank     = data.rank ? data.rank : this.rank;
}

SuperheroSchema.methods.loadPower = function(powerN) {
  this.superPowers.push(powerN);
}

module.exports = mongoose.model('Superhero', SuperheroSchema);
