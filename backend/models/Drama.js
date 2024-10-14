const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Drama = sequelize.define('Drama', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alternativetitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photolink: {
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
  trailerlink: {
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

Drama.associate = (models) => {
  Drama.belongsToMany(models.Genre, { 
    through: models.DramaGenre, 
    as: 'genres',
    foreignKey: 'drama_id',
    otherKey: 'genre_id'  // Pastikan ini sesuai dengan nama kolom di DramaGenres
  });
  Drama.belongsToMany(models.Actor, { 
    through: models.DramaActor, 
    as: 'actors',
    foreignKey: 'drama_id',
    otherKey: 'actor_id'  // Pastikan ini sesuai dengan nama kolom di DramaActors
  });
};

module.exports = Drama;
