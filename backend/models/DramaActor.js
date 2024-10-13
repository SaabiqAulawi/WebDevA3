const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DramaActor = sequelize.define('DramaActor', {
  drama_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Dramas', // Pastikan nama model drama sama
      key: 'id',
    },
  },
  actor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Actors', // Pastikan nama model actor sama
      key: 'id',
    },
  },
}, {
  timestamps: false, // Tidak perlu timestamps untuk tabel penghubung
  tableName: 'DramaActors' // Nama tabel di database
});

module.exports = DramaActor;
