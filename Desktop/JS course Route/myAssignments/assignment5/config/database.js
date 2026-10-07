const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('assignment5_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = sequelize;