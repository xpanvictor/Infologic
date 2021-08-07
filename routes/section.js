var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/all', function(req, res, next) {
  res.send('All sections pages not implemented');
});

/* GET all sections update page. */
router.get('/update', function(req, res, next) {
  res.send('Update sections pages not implemented');
});

/* GET specific section page. */
router.get('/:id', function(req, res, next) {
  res.send('Section ' + req.params.id + ' pages not implemented');
});

/* GET Update specific section page. */
router.get('/:id/update', function(req, res, next) {
  res.send('Section ' + req.params.id + ' update page not implemented');
});

module.exports = router;