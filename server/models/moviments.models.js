const Sequelize = require('sequelize')
const connection = require('../database/database')

const Moviments = connection.define('moviment', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  ID_Container: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  TypeOfMoviments: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  StartDateAndTime: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  EndDateAndTime: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})



module.exports = Moviments;