const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Drama = sequelize.define('Drama', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alternativeTitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'countries', // Nama tabel referensi
      key: 'id', // Nama kolom referensi
    },
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  trailerLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  award_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false, // Mengaktifkan createdAt dan updatedAt
});

module.exports = Drama;
