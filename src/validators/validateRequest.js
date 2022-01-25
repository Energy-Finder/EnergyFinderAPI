const { validationResult } = require("express-validator");

const validateRequestFields = function (req, res, response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.error = errors.array();
        return res.status(400).json(response);
    }
}

module.exports = validateRequestFields;