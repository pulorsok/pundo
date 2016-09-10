var mongoose = require('mongoose');
//mongoose.connect('localhost:27017/pundoServer');



var sensorSch = mongoose.Schema({
  _id: Object,
  tag: Array,
  tag_count: Number,
  order: String,
  date: Date,
  location: String,
  sensor_name: String
},{collection: "sensor"});

module.exports = mongoose.model('sensor', sensorSch);
