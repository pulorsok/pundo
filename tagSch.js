var mongoose = require('mongoose');
//mongoose.connect('localhost:27017/pundoServer');



var tagSchema = mongoose.Schema({
  _id: Object,
  tag_name: String,
  order_user: String,
  last_date: Date,
  location: String,
  tagId: String
},{collection: "tag"});




module.exports = mongoose.model('tag', tagSchema);
