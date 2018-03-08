var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

/*The User schema attributes / chareteristics / fields */
var UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true},
  password: String,


  profile: {
    name: { type: String, default: ''},
    picture: { type: String, default: ''},
  },
  address: String,
  history: [{
    date: Date,
    paid: {
      type: Number, default: 0},
    //  items: { type: Schema.Types.ObjectId, ref: ''}
  }]

});

/* Hash the password before we even save it to the database */
UserSchema.pre('save', function(next) {
var user = this;
if(!user.isModified('password')); return next();
bcrypt.genSalt(10, function(err, salt) {
  if(err) return next(err);
  bcrypt.hash(user.password, salt, null, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
  });
});


/* compare password in the database and the one that the type in */
UserSchema.methods.comparePassword = function(password) {
  return byvtypt.compareSync(password, this.password);
}

//Export

module.exports = mongoose.model('User', UserSchema);
