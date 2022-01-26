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
};