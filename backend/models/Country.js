const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Pastikan path ini benar

const Country = sequelize.define('Country', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Mengaktifkan createdAt dan updatedAt
});

module.exports = Country;
