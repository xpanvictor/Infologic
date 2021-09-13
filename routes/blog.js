var express = require('express');
var router = express.Router();
const prbac = require('../prbac');

var blog_controller = require('../controller/blogController');

/* GET home or all blogs page. */
router.get('/', function(req, res, next) {
  res.redirect('/blogs');
});

/* GET home findex page. */
router.get('/blogs/discover', blog_controller.discover);

/* GET all page. */
router.get('/blogs', blog_controller.blog_list);

/* GET blog create page. */
router.get('/blog/create', prbac.checkAuthor, blog_controller.blog_write_get);

/* POST blog create page. */
router.post('/blog/create', blog_controller.blog_write_post);

/* GET specific blog page. */
router.get('/blogs/blog/:id', blog_controller.blog);

/* POST comment to secific blog page. */
router.post('/blogs/blog/:id/comment', blog_controller.blog_comment);

/* POST like to secific blog page. */
router.post('/blogs/blog/:id/like', blog_controller.blog_like);

module.exports = router;
