const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DramaGenre = sequelize.define('DramaGenre', {
  drama_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'dramas',
      key: 'id',
    },
  },
  genre_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'genres',
      key: 'id',
    },
  },
}, {
  timestamps: false, // Tidak perlu timestamps untuk tabel penghubung
});

module.exports = DramaGenre;
