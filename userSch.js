var mongoose = require('mongoose');
//mongoose.connect('localhost:27017/pundoServer');



var userSchema = mongoose.Schema({
  _id: Object,
  user_name: String,
  user_password: String,
  sensor: Array,
  tag: Array,
  sensor_count: Number,
  tag_count: Number
},{collection: "user"});


userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
