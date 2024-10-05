const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Actor = sequelize.define('Actor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  photoLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'countries', // Nama tabel referensi
      key: 'id', // Nama kolom referensi
    },
  },
}, {
  timestamps: true, // Mengaktifkan createdAt dan updatedAt
});

module.exports = Actor;
