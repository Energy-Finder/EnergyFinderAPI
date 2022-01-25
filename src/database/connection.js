const Sequelize = require('sequelize');
const config = require('../../config/config.json');

const production = config.production;
const database = process.env.DATABASE || production.database;
const username = process.env.USERNAME || production.username;
const password = process.env.PASSWORD || production.password;
const host = process.env.HOST || production.host;
const dialect = process.env.DIALECT || production.dialect;

const connection = new Sequelize(database, username, password, {
    host,
    dialect
});

module.exports = connection;