const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  birthdate: {type: Date},
  role: {type: String, enum:['user', 'author', 'admin'], default: 'user'},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favourites: [{title: String, body: String, date: Date}],
  reads: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
  join_date: {type: Date, default: Date},
  contact: {type: String},
  bio: {type: String},
});

userSchema.methods.validatePassword = function(password){
  return this.password === password;
}

userSchema
.virtual('age')
.get(function(){
  d = new Date();
  return (d.getYear() - this.birthdate.getYear()).toString();
});

userSchema
.virtual('join_duration')
.get(function(){
  d = new Date;
  msLength = d - this.birthdate;
  days = (((msLength / 1000)/60)/60)/24;
  return days + ' days';
})

userSchema
.virtual('url')
.get(function(){
    return 'users/member/' + this.id;
});

module.exports = mongoose.model('User', userSchema)