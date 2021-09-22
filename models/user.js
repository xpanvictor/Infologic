const mongoose = require('mongoose');
const { DateTime } = require('luxon')

const userSchema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  birthdate: {type: Date, default: Date.now},
  role: {type: Number, enum:[0, 1, 2], default: 0, max: 2},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favourites: [{title: String, body: String, date: Date}],
  reads: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
  join_date: {type: Date, default: Date.now},
  contact: {type: String},
  bio: {type: String}
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
.virtual('full_name')
.get(function(){
  return (this.first_name + ' ' + this.last_name);
})

// Virtual for date added
userSchema
.virtual('join_dateF')
.get(function () {
  return DateTime.fromJSDate(this.join_date).toLocaleString(DateTime.DATE_MED);
});

// Virtual for date added
userSchema
.virtual('birthdateF')
.get(function () {
  return DateTime.fromJSDate(this.birthdate).toLocaleString(DateTime.DATE_MED);
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

userSchema.set('toJSON', {virtuals: true})
module.exports = mongoose.model('User', userSchema)