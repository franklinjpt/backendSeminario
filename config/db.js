require('dotenv').config();
const Sequelize = require('sequelize');

const {DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT} = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS,{
    dialect:  'postgres',
    host: DB_HOST,
    port: DB_PORT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
});

module.exports = sequelize;