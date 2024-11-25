const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

const DramaGenre = sequelize.define('DramaGenre', {
  drama_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Dramas', // Pastikan nama model drama sama
      key: 'id',
    },
  },
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Genres', // Pastikan nama model genre sama
      key: 'id',
    },
  },
}, {
  timestamps: false, // Tidak perlu timestamps untuk tabel penghubung
  tableName: 'DramaGenres' // Nama tabel di database
});

module.exports = DramaGenre;
