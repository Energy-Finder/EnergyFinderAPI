const sequelize = require('../../models').sequelize;
const tbProvider = require('../../models').tbProvider;
const validateRequestFields = require('../validators/validateRequest');

const responseModel = {
    success: false,
    data: [],
    error: []
};

const createOrUpdate = function (req, res, query) {
    let response = { ...responseModel };
    let statusCode = 500;

    const isInvalidRequest = validateRequestFields(req, res, response);
    if (isInvalidRequest) return false;

    sequelize.query(query, { model: tbProvider }
    ).then(() => {
        if (query.includes('INSERT')) {
            statusCode = 201;
        } else {
            statusCode = 200;
        }
        response.success = true;
    }).catch(err => {
        response.error = err.message;
    }).finally(() => {
        return res.status(statusCode).json(response);
    })
}

const get = function (req, res, query) {
    let response = { ...responseModel };
    let statusCode = 500;

    sequelize.query(`${query}`, { model: tbProvider }
    ).then(res => {
        statusCode = 200;
        response.success = true;
        response.data = res;
    }).catch(err => {
        response.error = err.message;
    }).finally(() => {
        return res.status(statusCode).json(response);
    })
};

module.exports = {
    async create(req, res) {
        const { name, logo, uf, kwhPrice, kwhMinLimit, totalClients, averageRating } = req.body;
        const query = `INSERT INTO tbProvider VALUES ('${name}', '${logo}', '${uf}', ${kwhPrice}, ${kwhMinLimit}, ${totalClients}, ${averageRating})`;
        createOrUpdate(req, res, query);
    },

    async update(req, res) {
        const id = req.params.id;
        const { name, logo, uf, kwhPrice, kwhMinLimit, totalClients, averageRating } = req.body;
        const query = `UPDATE tbProvider SET 
        providerName='${name}', 
        providerLogo='${logo}', 
        providerUf='${uf}', 
        providerKwhPrice=${kwhPrice}, 
        providerKwhLimit=${kwhMinLimit}, 
        providerClientsTotal=${totalClients}, 
        providerAverageRating=${averageRating}
        WHERE providerId=${id}`;
        createOrUpdate(req, res, query);
    },

    async getAll(req, res) {
        const query = 'SELECT * FROM tbProvider';
        get(req, res, query);
    },

    async getCompatibleProvider(req, res) {
        const query = `SELECT * FROM tbProvider WHERE providerKwhLimit <= ${req.params.limit}`;
        get(req, res, query);
    }
};