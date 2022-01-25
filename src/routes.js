const router = require('express').Router();

const UserController = require('./controllers/UserController');

router.post('/user', UserController.create);

router.post('/user/auth', UserController.auth);

module.exports = router;