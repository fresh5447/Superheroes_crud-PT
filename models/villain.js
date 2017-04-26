var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var VillainSchema = new Schema({
  name:       String,
  evilPowers: { default: [], type: Array },
  evil:       { default: true, type: Boolean },
  nemesis:    String,
  img:        String,
  universe:   String,
});

VillainSchema.methods.loadData = function(data) {
  this.name       = data.name ? data.name : this.name;
  this.evil       = data.evil ? data.evil : this.evil;
  this.rank       = data.rank ? data.rank : this.rank;
  this.nemesis    = data.nemesis ? data.nemesis : this.nemesis;
  this.img        = data.img ? data.img : this.img;
  this.universe   = data.universe ? data.universe : this.universe;
};

VillainSchema.methods.loadPower = function(powerN) {
  this.evilPowers.push(powerN);
};


module.exports = mongoose.model('Villain', VillainSchema);
