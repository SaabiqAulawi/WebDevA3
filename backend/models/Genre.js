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

Genre.associate = (models) => {
  Genre.belongsToMany(models.Drama, { 
    through: models.DramaGenre, 
    as: 'dramas',
    foreignKey: 'genre_id',
    otherKey: 'drama_id'
  });
};

module.exports = Genre;