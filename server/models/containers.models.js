const Sequelize = require('sequelize')
const connection = require('../database/database')

const Containers = connection.define('container', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  Client: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ID_Container: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  State: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Type: {
    type: Sequelize.STRING,
    allowNull: false,
  },

})



module.exports = Containers;