const sequelize = require('../../models').sequelize;
const tbProvider = require('../../models').tbProvider;
const validateRequestFields = require('../validators/validateRequest');

const responseModel = {
    success: false,
    data: [],
    error: []
};

module.exports = {
    async create(req, res) {
        const { name, logo, uf, kwhPrice, kwhMinLimit } = req.body;
        let response = { ...responseModel };
        let statusCode = 500;

        const isInvalidRequest = validateRequestFields(req, res, response);
        if (isInvalidRequest) return false;
        
        sequelize.query(`INSERT INTO tbProvider VALUES ('${name}', '${logo}', '${uf}', ${kwhPrice}, ${kwhMinLimit})`, { model: tbProvider }
        ).then(() => {
            statusCode = 201;
            response.success = true;
        }).catch(err => {
            response.error = err.message;
        }).finally(() => {
            return res.status(statusCode).json(response);
        })
    },

    async listAll(req, res) {
        let response = { ...responseModel };
        let statusCode = 500;
        
        sequelize.query(`SELECT * FROM tbProvider`, { model: tbProvider }
        ).then(res => {
            statusCode = 200;
            response.success = true;
            response.data = res;
        }).catch(err => {
            response.error = err.message;
        }).finally(() => {
            return res.status(statusCode).json(response);
        })
    },
};