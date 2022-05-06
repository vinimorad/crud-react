const Sequelize = require('sequelize');

const connection = new Sequelize(process.env.NAME_DATABASE, process.env.USER, process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection