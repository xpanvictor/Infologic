var express = require('express');
var router = express.Router();

var author_controller = require('../controller/authorController');

/* GET all authors page. */
router.get('/', author_controller.get_all);

/* GET admin page. */
router.get('/admin', function(req, res, next) {
  res.render('admin', {title: 'Admin'});
});

/* GET Author create page. */
router.get('/all', function(req, res, next) {
  res.send('Author create page not implemented');
});

/* GET specific authors page. */
router.get('/:id', function(req, res, next) {
  res.send('Author ' + req.params.id + ' page not implemented');
});

module.exports = router;