const mongoose = require('mongoose');
const slugify = require('slugify');
const { DateTime } = require('luxon');
const { text } = require('body-parser');

const articleSchema = new mongoose.Schema({
    title: {type: String, required: true, index: true},
    blogImg: {type: Buffer},
    blogImgType: {type: String},
    dateAdded: {type: Date, default: Date.now},
    story: {type: String, required: true},
    description: {type: String, required: true},
    section: {type: String},
    visible: {type: Boolean, default: false, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
    comments: [{name: String, body: String, date: {type: Date, default: Date.now}}],
    likes: [],
    reads: {type: Number, default: 0},
    slug: {type: String, required: true, unique: true}
});

articleSchema.pre('validate', function(next){
    if (this.title){
        this.slug = slugify(this.title, {lower: true, strict: true});
    }
    next();
});

articleSchema.pre('validate', function(next){
    if (typeof(this.description) == 'undefined'){
        this.description = this.story.slice(0, 200);
    }
    next();
});

articleSchema
.virtual('img')
.get(function(){
    if (this.blogImg != null && this.blogImgType != null){
        return `data:${this.blogImgType};charset=utf-8;base64,${this.blogImg.toString('base64')}`
    }
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
    return '/blogs/blog/'+this.slug;
});

articleSchema.set('toJSON', {virtuals: true})

articleSchema.index({title: 'text'})

module.exports = mongoose.model('Article', articleSchema);