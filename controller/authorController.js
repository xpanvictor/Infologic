const async = require('async');
const Author = require('../models/author');
const Blog = require('../models/article');
const { body, validationResult} = require('express-validator');
const User = require('../models/user');

exports.get_all = function(req, res, next){
    res.render('authors', {title: "Authors page"})
}

exports.get_admin = function(req, res, next) {
    res.render('admin', {title: 'Admin'});
}

exports.get_authorpanel = function(req, res, next) {
    async.parallel({
        author: function(callback){
            Author.findOne({me: req.user._id}).populate('me')
            .exec(callback)
        },
        blogs: function(callback){
            Blog.find({author: req.user._id})
            .exec(callback)
        }
    },
        function(err, results){
            if (err){
                return next(err)
            }
            res.render('mypanel', {layout: 'plain',title: 'My Panel', total: results})
        }
    )
}

exports.get_createAuthor = function(req, res, next){
    res.render('joinauthors', {title: 'Become author'})
}

exports.post_createAuthor = function(req, res, next) {
    const author = new Author({
      me: req.user._id,
      nickname: req.body.nickname,
      bio: req.body.bio
    })
    Author.findOne({'me': req.user._id})
        .exec( function (err, found_author){
            if (err){ return next(err)}
            if (found_author){
                res.send('Author exists: ' + req.user.email)
            }
            else{
                if(req.user.role == 0){
                    User.findOneAndUpdate(
                        {email: req.user.email},
                        {$set: {role: 1}},
                        {upsert: false}, function(err, user){
                            if (err) { throw err;}
                            else{ console.log(user.role) }
                        }
                    )
                }
                author.save(function (err) {
                    if (err){ return next(err);}
                    res.send('Author saved ' + req.user.email)
                })
            }
        })
}