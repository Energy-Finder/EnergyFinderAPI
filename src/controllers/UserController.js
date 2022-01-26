const sequelize = require('../../models').sequelize;
const tbUser = require('../../models').tbUser;
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

        validateRequestFields(req, res, response);

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
        const { email, password } = req.body;
        let response = { ...responseModel };
        let statusCode = 500;

        validateRequestFields(req, res, response);

        sequelize.query(`SELECT * FROM tbUser WHERE userEmail='${email}' AND userPassword='${password}'`, { model: tbUser }
        ).then(res => {
            if (res.length == 0){
                statusCode = 404;
            } else {
                statusCode = 200;
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