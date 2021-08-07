const async = require('async');
const mongoose = require('mongoose');
const Blog = require('../models/article');
const Section = require('../models/section');
const { body, validationResult} = require('express-validator');

exports.get_all = function(req, res, next){
    res.render('authors', {title: "Authors page"})
}