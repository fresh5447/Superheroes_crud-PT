var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var VillainSchema = new Schema({
  name: String,
  evilPower: String,
  evil: { default: true, type: Boolean },
  nemesis: String,
  img: String
});

module.exports = mongoose.model('Villain', VillainSchema);
