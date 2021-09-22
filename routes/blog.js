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

/* GET request to search blog */
router.get('/search', blog_controller.search)

/* GET request to search category */
router.get('/searchCategory/:id', blog_controller.searchCat)

/* GET all page. */
router.get('/blogs', blog_controller.blog_list);

/* GET blog create page. */
router.get('/blog/create', prbac.checkAuthor, blog_controller.blog_write_get);

/* POST blog create page. */
router.post('/blog/create', blog_controller.blog_write_post);

/* GET specific blog page. */
router.get('/blogs/blog/:id', blog_controller.blog);

/* GET update specific blog page. */
router.get('/blogs/blog/:id/update', prbac.checkAuthor, blog_controller.blog_update_get);

/* PUT update specific blog page. */
router.put('/blogs/blog/:id/update', blog_controller.blog_update_put);

/* DELETE update specific blog page. */
router.delete('/blogs/blog/:id/delete', blog_controller.blog_delete);

/* POST comment to secific blog page. */
router.post('/blogs/blog/:id/comment', blog_controller.blog_comment);

/* GET like to secific blog page. */
router.get('/blogs/blog/:id/like/:like', blog_controller.blog_like);

/* GET dislike to secific blog page. */
router.get('/blogs/blog/:id/dislike/:like', blog_controller.blog_dislike);

module.exports = router;
