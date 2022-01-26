const router = require('express').Router();
const { body } = require("express-validator");

const UserController = require('./controllers/UserController');
const ProviderController = require('./controllers/ProviderController');

router.post('/user', [
    body('username').notEmpty().withMessage(`username cannot be null`),
    body('email').isEmail().withMessage(`email is invalid`),
    body('password').isLength({ min: 3 }).withMessage(`password should be greater than 2 characters`)
], UserController.create);

router.post('/user/auth', [
    body('email').isEmail().withMessage(`email is invalid`),
    body('password').isLength({ min: 3 }).withMessage(`password should be greater than 2 characters`)
], UserController.auth);

router.post('/provider', [
    body('name').notEmpty().withMessage(`name cannot be null`),
    body('logo').notEmpty().withMessage(`logo cannot be null`),
    body('uf').isLength({ max: 2 }).withMessage(`uf should be 2 characters`),
    body('kwhPrice').isFloat().withMessage(`kwhPrice should be float type`),
    body('kwhMinLimit').isFloat().withMessage(`kwhMinLimit should be float type`),
    body('totalClients').isInt().withMessage(`kwhMinLimit should be integer type`),
    body('averageRating').isFloat().withMessage(`kwhMinLimit should be float type`),
], ProviderController.create);

router.get('/provider', ProviderController.getAll);

router.get('/provider/:limit', ProviderController.getCompatibleProvider);

module.exports = router;