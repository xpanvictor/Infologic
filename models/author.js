const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  me: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  author_date: {type: Date, default: Date.now},
  preferences: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}],
  description: {type: String, required: true}
});

authorSchema
.virtual('author_duration')
.get(function(){
  d = new Date;
  msLength = d - this.author_date;
  days = (((msLength / 1000)/60)/60)/24;
  return days + ' days';
});

articleSchema
.virtual('url')
.get(function(){
    return 'users/author' + this.id;
});

module.exports('Author', authorSchema);