const sequelize = require('../../models').sequelize;
const tbUser = require('../../models').tbUser;
const jwt = require('jsonwebtoken');
const validateRequestFields = require('../validators/validateRequest');

const responseModel = {
    success: false,
    data: [],
    error: []
};

module.exports = {
    async create(req, res) {
        const { username, email, password } = req.body;
        let response = { ...responseModel };
        let statusCode = 500;

        const isInvalidRequest = validateRequestFields(req, res, response);
        if (isInvalidRequest) return false;

        sequelize.query(`INSERT INTO tbUser VALUES ('${username}', '${email}', '${password}')`, { model: tbUser }
        ).then(() => {
            statusCode = 201;
            response.success = true;
        }).catch(err => {
            response.error = err.message;
        }).finally(() => {
            return res.status(statusCode).json(response);
        })
    },

    async auth(req, res) {
        const { email, password } = req.params;
        let response = { ...responseModel };
        let statusCode = 500;

        const isInvalidRequest = validateRequestFields(req, res, response);
        if (isInvalidRequest) return false;

        sequelize.query(`SELECT * FROM tbUser WHERE userEmail='${email}' AND userPassword='${password}'`, { model: tbUser }
        ).then(res => {
            if (res.length > 0){
                const token = jwt.sign( {email: email, password: password }, 'EFCLARK', { expiresIn: 500 });
                response["auth"] = true;
                response["token"] = token;
                statusCode = 200;
            } else {
                statusCode = 404;
            }
            response.success = true;
            response.data = res;
        }).catch(err => {
            response.error = err;
        }).finally(() => {
            return res.status(statusCode).json(response);
        })

    }
};