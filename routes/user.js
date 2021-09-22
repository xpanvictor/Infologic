const express = require('express');
const user_controller = require('../controller/userController')
const router = express.Router();
const prbac = require('../prbac')

/* GET users create. */
router.get('/', user_controller.get_create);

/* POST users create. */
router.post('/join', user_controller.post_create);

/* POST users login. */
router.post('/login', user_controller.post_login);

/* GET user page. */
router.get('/me/:id', user_controller.get_user);

/* GET user page. */
router.get('/user/:id', prbac.checkAuth, user_controller.get_user_id);

/* GET user update. */
router.get('/:id/update', function(req, res, next) {
  res.send(req.params.id + ' user not implemented');
});

module.exports = router;
