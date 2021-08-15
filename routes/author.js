var express = require('express');
var router = express.Router();
const prbac = require('../prbac');
const Author = require('../models/author')

var author_controller = require('../controller/authorController');
const user = require('../models/user');

/* GET all authors page. */
router.get('/', author_controller.get_all);

// Final route to settle in authors routes, hooray!
/* GET specific authors page. */
router.get('/:id', function(req, res, next) {
  res.send('Author ' + req.params.id + ' page not implemented');
});

/* GET Author create page. */
router.get('/createauthor', prbac.checkAuth, author_controller.get_createAuthor);

/* Post Author create page. */
router.post('/createauthor', author_controller.post_createAuthor);

/* GET admin page. */
router.get('/panel/admin', prbac.isAdmin, author_controller.get_admin);

/* GET specific authors panel page. */
router.get('/panel/:id', author_controller.get_authorid);

module.exports = router;