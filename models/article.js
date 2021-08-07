const mongoose = require('mongoose');
const slugify = require('slugify');
const { DateTime } = require('luxon');

const articleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    dateAdded: {type: Date, default: Date.now},
    story: {type: String, required: true},
    section: {type: String},
    visible: {type: Boolean, default: false, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
    comments: [{name: String, body: String, date: Date}],
    likes: {type: Number, default: 0},
    reads: {type: Number, default: 0},
    slug: {type: String, required: true, unique: true}
});

articleSchema.pre('validate', function(next){
    if (this.title){
        this.slug = "blog/" + slugify(this.title, {lower: true, strict: true});
    }
    next();
});


articleSchema
.virtual('description')
.get(function(){ 
    return this.story.slice(0, 50);
})

articleSchema
.virtual('safe')
.get(function(){
    return this.slug.slice(-5, -1)
})

// Virtual for date added
articleSchema
.virtual('dateAddedF')
.get(function () {
  return DateTime.fromJSDate(this.dateAdded).toLocaleString(DateTime.DATE_MED);
});

articleSchema
.virtual('url')
.get(function(){
    return 'blog/' + this.slug;
});

module.exports = mongoose.model('Article', articleSchema);