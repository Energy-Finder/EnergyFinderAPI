const router = require('express').Router();
const { body } = require("express-validator");

const UserController = require('./controllers/UserController');

router.post('/user', [
    body('username').isLength({ min: 1 }),
    body('email').isEmail(),
    body('password').isLength({ min: 3 })
], UserController.create);

router.post('/user/auth', [
    body('email').isEmail(),
    body('password').isLength({ min: 3 })
], UserController.auth);

module.exports = router;