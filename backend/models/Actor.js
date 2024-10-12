const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Actor = sequelize.define('Actor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  photolink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Countries', // Nama tabel referensi
      key: 'id', // Nama kolom referensi
    },
  },
}, {
  timestamps: false, // Mengaktifkan createdAt dan updatedAt
});

module.exports = Actor;
