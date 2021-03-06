const mongoose = require('mongoose');
const { populate } = require('./user');
const User = require('./user');

const authorSchema = new mongoose.Schema({
  nickname: {type: String},
  me: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  author_date: {type: Date, default: Date.now},
  preferences: [{type: String}],
  bio: {type: String}
});

authorSchema
.virtual('author_duration')
.get(function(){
  d = new Date;
  msLength = d - this.author_date;
  days = (((msLength / 1000)/60)/60)/24;
  return days + ' days';
});

authorSchema
.virtual('url')
.get(function(){
    return 'users/author' + this.id;
});

module.exports = mongoose.model('Author', authorSchema);