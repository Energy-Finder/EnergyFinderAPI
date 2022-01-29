const router = require('express').Router();
const { body, param } = require('express-validator');
const jwt = require('jsonwebtoken');

const UserController = require('./controllers/UserController');
const ProviderController = require('./controllers/ProviderController');

const verifyJWT = function (req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, 'EFCLARK', (err, decoded) => {
        if(err) return res.status(401).json({error: "invalid auth token"}).end();
        next();
    })
}

router.post('/user', [
    body('username').notEmpty().withMessage('username cannot be null'),
    body('email').isEmail().withMessage('email is invalid'),
    body('password').isLength({ min: 3 }).withMessage('password should be greater than 2 characters')
], UserController.create);

router.get('/user/auth/:email/:password', [
    param('email').isEmail().withMessage('email is invalid'),
    param('password').isLength({ min: 3 }).withMessage('password should be greater than 2 characters')
], UserController.auth);

router.post('/provider', [
    body('name').notEmpty().withMessage('name cannot be null'),
    body('logo').notEmpty().withMessage('logo cannot be null'),
    body('uf').isLength({ max: 2 }).withMessage('uf should be 2 characters'),
    body('kwhPrice').isFloat().withMessage('kwhPrice should be float type'),
    body('kwhMinLimit').isFloat().withMessage('kwhMinLimit should be float type'),
    body('totalClients').isInt().withMessage('kwhMinLimit should be integer type'),
    body('averageRating').isFloat().withMessage('kwhMinLimit should be float type'),
], ProviderController.create);

router.put('/provider/:id', [
    param('id').notEmpty().withMessage('query param "id" is required'),
    body('name').notEmpty().withMessage('name cannot be null'),
    body('logo').notEmpty().withMessage('logo cannot be null'),
    body('uf').isLength({ max: 2 }).withMessage('uf should be 2 characters'),
    body('kwhPrice').isFloat().withMessage('kwhPrice should be float type'),
    body('kwhMinLimit').isFloat().withMessage('kwhMinLimit should be float type'),
    body('totalClients').isInt().withMessage('kwhMinLimit should be integer type'),
    body('averageRating').isFloat().withMessage('kwhMinLimit should be float type'),
], ProviderController.update);

router.get('/provider', verifyJWT, ProviderController.getAll);

router.get('/provider/:limit', verifyJWT, ProviderController.getCompatibleProvider);

module.exports = router;