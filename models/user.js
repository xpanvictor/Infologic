const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  birthdate: {type: Date},
  favourites: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
  reads: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
  join_date: {type: Date, default: Date.now},
  contact: {type: String},
  bio: {type: String}
});

userSchema
.virtual('age')
.get(function(){
  d = new Date();
  return (d.getYear() - this.birthdate.getYear()).toString();
});

authorSchema
.virtual('join_duration')
.get(function(){
  d = new Date;
  msLength = d - this.birthdate;
  days = (((msLength / 1000)/60)/60)/24;
  return days + ' days';
});

userSchema
.virtual('url')
.get(function(){
    return 'blog/' + this.id;
});

module.exports('User', userSchema)