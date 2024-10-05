const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Nama tabel referensi
      key: 'id', // Nama kolom referensi
    },
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  drama_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'dramas', // Nama tabel referensi
      key: 'id', // Nama kolom referensi
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Unapproved',
  },
}, {
  timestamps: true, // Mengaktifkan createdAt dan updatedAt
});

module.exports = Comment;
