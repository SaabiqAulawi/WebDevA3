const { Sequelize } = require('sequelize');

// Konfigurasi koneksi database menggunakan PostgreSQL
const sequelize = new Sequelize('your_database_name', 'your_database_user', 'your_password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Nonaktifkan logging jika tidak diperlukan
});

module.exports = sequelize;
