const mongoose = require('mongoose');
const slugify = require('slugify');

const sectionSchema = new mongoose.Schema({
  name: {type: String, required: true},
  articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Articles'}],
  description: {type: String, required: true}
});

sectionSchema.pre('validate', function(next){
  if (this.name){
      this.slug = slugify(this.name, {lower: true, strict: true});
  }
  next();
})

sectionSchema
.virtual('url')
.get(function(){
    return 'blog/section' + this.slug;
});

module.exports = mongoose.model('Section', sectionSchema);