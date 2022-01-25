const connection = require("../database/connection");

const responseModel = {
    success: false,
    data: [],
    error: []
};

module.exports = {
    async register(req, res) {
        const response = {...responseModel}
        const { username, password } = req.body;

        const [, affectRows] = await connection.query(`
            INSERT INTO users VALUES (DEFAULT, '${username}', '${password}', NOW(), NOW())
        `)

        response.success = affectRows > 0

        return res.json(response);
    },
    
    async login(req, res) {
        const response = {...responseModel}
        const { username, password } = req.body;

        const [, data] = await connection.query(`
            SELECT * FROM users WHERE username='${username}' AND password='${password}'
        `);

        console.log(data);

        return res.json(response);
    }
};