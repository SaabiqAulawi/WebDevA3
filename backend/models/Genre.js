const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genre = sequelize.define('Genre', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, // Mengaktifkan createdAt dan updatedAt
});

module.exports = Genre;