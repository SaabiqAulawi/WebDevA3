const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  drama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Unapproved',
  },
});

module.exports = Comment;
