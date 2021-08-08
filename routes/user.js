var express = require('express');
var router = express.Router();

/* GET users create. */
router.get('/', function(req, res, next) {
  res.render('reglog', {title: "Register/Login page"});
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  res.send(req.params.id + ' user not implemented');
});

/* GET user update. */
router.get('/:id/update', function(req, res, next) {
  res.send(req.params.id + ' user not implemented');
});

module.exports = router;
