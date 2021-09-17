const async = require('async');
const mongoose = require('mongoose');
const Blog = require('../models/article');
const Section = require('../models/section');
const { body, validationResult} = require('express-validator');
const Author = require('../models/author');


// Get request to create blog
exports.blog_write_get = function(req, res, next){
  async.parallel({
    author: function (callback) {
      Author.findOne({me: req.user._id})
        .populate('me')
        .exec(callback)
    }
  }, function (err, result){
      if (err) {return next(err)}
      // Render 
      res.render('write', {title: 'Make blog', name: result.author.nickname});
  })
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
    author: req.user._id,
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

// Get request to uodate page
exports.blog_update_get = function(req, res, next){
  Blog.findOne({'slug': req.params.id})
  .exec( function(err, blog){
    if (err) return next(err);
    res.render('write', {title: 'Update blog', name: 'hey', blog: blog, update: true})
  })
}

// Put request to update page
exports.blog_update_put = function(req, res, next){
  console.log(req.body);
  Blog.updateOne(
    {'slug': req.params.id},
    {$set: {
      'title': 'Saturday',
      'story': req.body.story,
      'description': req.body.rawstory,
      'visible': req.body.visible,
      'section': req.body.section
    }},
    {upsert: true}
  )
  .exec(function(err, result){
    if (err){return next(err)}
    res.json(result)
  })
}

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

// Get request to discover
exports.discover = function(req, res, next){
  async.parallel({
    RR: function(callback){
      Blog.find()
      .sort({dateAdded: -1})
      .exec(callback)
    }
  },
    function(err, result){
      if (err){ return(next(err)) }
      res.render('discover', {title:"Discover", RR: result.RR})
    })
}

// Get request to particular blog
exports.blog = function(req, res, next){
  
  Blog.findOne({ 'slug' : req.params.id})
  .populate("author")
  .exec(function(err, result){
    if (err){ return next(err)};
    //Successful then render
    // console.log(result)
    // res.send(result)
    res.render('page', {layout: 'plain' ,title: result.title, blog: result})
  })
}

//Post comment to blog post with id
exports.blog_comment = async function(req, res, next){
  let comment = {
    name: (req.user)? req.user.full_name : 'Anonymous',
    body: req.body.commentText
  }
  await Blog.findOneAndUpdate({'slug': req.params.id}, {$push: {comments: comment}})
  .exec(function(err, result){
    if (err){return next(err)}
    res.redirect("back")
  })
}

//Get like to blog post with id
exports.blog_like = async function(req, res, next){
  if (req.user){
  Blog.findOne({'slug': req.params.id})
  .exec(function(err, result){
    if (!(result.likes.includes(req.user.email))){
      Blog.findOneAndUpdate({'slug': req.params.id}, {$push: {likes: req.user.email }}, {new: true})
      .exec(function(err, result){
        if (err) return next(err);
        if (result){
          res.json([result.likes.length, true])
        }
      })
    }
    else{
      res.json([req.params.like, true])
    }
  })
  }
  else{
    res.json([req.params.like, false])
  }
}

//Get dislike to blog post with id
exports.blog_dislike = async function(req, res, next){
  if (req.user){
  Blog.findOne({'slug': req.params.id})
  .exec(function(err, result){
    if ((result.likes.includes(req.user.email))){
      Blog.findOneAndUpdate({'slug': req.params.id}, {$pull: {'likes': req.user.email }}, {new: true})
      .exec(function(err, result){
        if (err) return next(err);
        if (result){
          res.json([result.likes.length, true])
        }
      })
    }
    else{
      res.json([req.params.like, true])
    }
  })
  }
  else{
    res.json([req.params.like, false])
  }
}