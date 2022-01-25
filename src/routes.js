const router = require('express').Router();

const UserController = require('./controllers/UserController');

router.post('/user', UserController.register);
router.post('/user/login', UserController.login);

module.exports = router;