var express = require('express');
var user_controller = require('../controller/userController')
var router = express.Router();

/* GET users create. */
router.get('/', user_controller.get_create);

/* POST users login. */
router.post('/member', user_controller.post_login);

/* POST users create. */
router.post('/join', user_controller.post_create);

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  res.send(req.params.id + ' user not implemented');
});

/* GET user update. */
router.get('/:id/update', function(req, res, next) {
  res.send(req.params.id + ' user not implemented');
});

module.exports = router;
