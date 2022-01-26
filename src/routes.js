const router = require('express').Router();
const { body } = require("express-validator");

const UserController = require('./controllers/UserController');
const ProviderController = require('./controllers/ProviderController');

router.post('/user', [
    body('username').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 3 })
], UserController.create);

router.post('/user/auth', [
    body('email').isEmail(),
    body('password').isLength({ min: 3 })
], UserController.auth);

router.post('/provider', [
    body('name').notEmpty().withMessage(`name cannot be null`),
    body('logo').notEmpty().withMessage(`logo cannot be null`),
    body('uf').isLength({ max: 2 }).withMessage(`uf should be 2 characters`),
    body('kwhPrice').isFloat().withMessage(`kwhPrice should be float type`),
    body('kwhMinLimit').isFloat().withMessage(`kwhMinLimit should be float type`),
], ProviderController.create);

module.exports = router;