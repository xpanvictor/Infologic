var express = require('express');
var router = express.Router();
const async = require('async')
const Blog = require('../models/article')

router.get('/', function(req, res, next){
    res.send('API ready for setup')
});

router.get('/blogs', function(req, res, next){
    async.parallel({
        RR: function(callback){
          Blog.find()
          .sort({dateAdded: -1})
          .exec(callback)
        }
      },
        function(err, result){
          if (err){ return(next(err)) }
          res.json(result.RR)
        })
});

module.exports = router