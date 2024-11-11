// models/Actor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Country = require('./Country'); // Pastikan model Country diimpor

const Actor = sequelize.define('Actor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  photolink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Countries',
      key: 'id',
    },
  },
}, {
  timestamps: false,
});

// Menambahkan relasi dengan Country
Actor.belongsTo(Country, { foreignKey: 'country_id', as: 'country' });

module.exports = Actor;
