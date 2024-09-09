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
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  genres: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  actors: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  trailerLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  award: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Unapproved',
  },
});

module.exports = Drama;
