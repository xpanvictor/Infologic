const async = require('async');
const mongoose = require('mongoose');
const Blog = require('../models/article');
const Section = require('../models/section');
const { body, validationResult} = require('express-validator');

// Get request to create blog
exports.blog_write_get = function(req, res){
  res.render('write', {title: 'Make blog', name: 'Admin'});
};
//Post request to create blog
exports.blog_write_post = [
  body('title').trim().isLength({ min: 1 }).escape().withMessage('Title must be specified.'),
  // body('story').trim().isLength({min: 1}).escape().withMessage('Story cannot be empty'),

  //Process request after validation and sanitation
  (req, res, next) => {
    //Extract all errors
    var errors = validationResult(req);
    // Create a blog object
    var blog = new Blog({
    title: req.body.title,
    story: req.body.story,
    description: req.body.rawstory,
    visible: req.body.visible,
    section: req.body.section
     });
    if (!errors.isEmpty()){
      //There are errors, render form again
      res.render('write', {title: 'Error', name: 'Admin', blog: blog, errors: errors.array()});
    }
    else{
      //No errors but check if same blog exist in db
      Blog.findOne({ 'title': req.body.title })
        .exec( function(err, found_Blog) {
           if (err) { return next(err); }

           if (found_Blog) {
             // Blog exists, render page again
             res.render('write', {title: 'Blog found', name:'Admin', blog: blog, errors: [{msg: "Blog title exist already"}]});
           }
           else{
                // Save blog
                blog.save(function(err){
                  if (err) {return next(err); }
                  // Show response if saved
                  res.send('Saved successfully ' + blog.story);
             });
           }
      });
    }
  }
];

// Get request to home page
exports.blog_list = function(req, res, next){
  async.parallel({
    blog: function(callback){
      Blog.find()
      .populate('author')
      .exec(callback)
    },
    rblogs: function(callback){
      Blog.find()
      .sort({dateAdded: -1})
      .exec(callback)
    },
    secscience: function(callback){
      Blog.countDocuments({'section': 'Science'}, callback)
    },
    secarts: function(callback){
      Blog.countDocuments({'section': 'Arts'}, callback)
    },
    secothers: function(callback){
      Blog.countDocuments({'section': 'Other'}, callback)
    },
    secent: function(callback){
      Blog.countDocuments({'section': 'Entertainment'}, callback)
    }
  }, function(err, result){
    if (err){ return next(err);}
    //Successfull, render
    res.render('index', {title: 'Home page', blogs: result.blog, rblogs: result.rblogs,
    counts: [{n : 'Science', c: result.secscience}, {n : 'Arts', c: result.secarts},
    {n : 'Entertainment', c: result.secent}, {n : 'Others', c: result.secothers}]});
  }
  )
}

// Get request to findex
exports.blog_findex = function(req, res, next){
  res.render('findex', {title:"findex"})
}

// Get request to particular blog
exports.blog = function(req, res, next){
  
  Blog.findOne({ 'slug' : "blog/"+req.params.id})
  .exec(function(err, result){
    if (err){ return next(err)};
    //Successful then render
    res.render('page', {blog: result})
  })
}