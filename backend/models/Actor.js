const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Actor = sequelize.define('Actor', {
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Actor;
