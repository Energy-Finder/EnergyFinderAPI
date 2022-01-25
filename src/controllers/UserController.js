const sequelize = require('../../models').sequelize;
const tbUser = require('../../models').tbUser;
const { validationResult } = require("express-validator");

const responseModel = {
    success: false,
    data: [],
    error: []
};

const validateFields = function (req, res) {
    const errors = validationResult(req);
    let response = { ...responseModel };

    if (!errors.isEmpty()) {
        response.error = errors.array();
        return res.status(400).json(response);
    }
}

module.exports = {
    async create(req, res) {
        const { username, email, password } = req.body;
        let response = { ...responseModel };
        let statusCode = null;

        validateFields(req, res);

        sequelize.query(`INSERT INTO tbUser VALUES ('${username}', '${email}', '${password}')`, { model: tbUser }
        ).then(() => {
            statusCode = 201;
            response.success = true;
        }).catch(err => {
            statusCode = 500;
            response.error = err.message;
        }).finally(() => {
            return res.status(statusCode).json(response);
        })
    },

    async auth(req, res) {
        const { email, password } = req.body;
        let response = { ...responseModel };
        let statusCode = null;

        validateFields(req, res);

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
            statusCode = 500;
            response.error = err;
        }).finally(() => {
            return res.status(statusCode).json(response);
        })

    }
};