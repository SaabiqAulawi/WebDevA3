const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DramaActor = sequelize.define('DramaActor', {
  drama_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'dramas',
      key: 'id',
    },
  },
  actor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'actors',
      key: 'id',
    },
  },
}, {
  timestamps: false, // Tidak perlu timestamps untuk tabel penghubung
});

module.exports = DramaActor;
