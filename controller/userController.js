const async = require('async');
const mongoose = require('mongoose');
const User = require('../models/user');
const Section = require('../models/section');
const { body, validationResult} = require('express-validator');
const { blog } = require('./blogController');
const passport = require('passport');
const bcrypt = require('bcrypt');

exports.get_create = function(req, res, next) {
    res.render('reglog', {title: "Register/Login page"});
}

exports.post_create = [
    body('email').trim().isLength({min: 1}).escape().withMessage('Email must be specified'),
    body('password').trim().isLength({min: 1}).escape().withMessage('Password must be specified'),

    // Process request after validation
    async (req, res, next) => {
        var errors = validationResult(req);
        // Create a user object
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        var user = new User({
            first_name: req.body.fname,
            last_name: req.body.lname,
            email: req.body.email,
            password: hashedPassword,
            birthday: req.body.bdate
        });
        if (!errors.isEmpty()){
            //There are errors, render form again
            res.render('reglog', {title: 'Register/Login page', blog: blog, errors: errors.array()});
            }
        else{
            // No errors, push new user to database after checking existence
            User.findOne({'email': req.body.email})
            .exec((err, found_user) => {
                    if (err) {return next(err)};
                    if (found_user){
                        res.render('reglog', {title:'Register/Login page', user:user, errors: [{msg: 'User exists already'}]});
                    }
                else{
                        // Save blog
                        user.save(function(err){
                        if (err) {return next(err); }
                        // Show response if saved
                        res.redirect('/users');
                        console.log(user)
                        });
                    }
            }   )
        }               
    }

]

exports.post_login = passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/users/',
                failureFlash: true
            })

exports.get_user = function (req, res, next) {
    res.render('userpage', {title: 'User', user: req.user})
}