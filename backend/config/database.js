const { Sequelize } = require('sequelize');
require('dotenv').config(); // Memuat variabel dari file .env

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres', // Ganti dengan dialect yang Anda gunakan (misal: mysql, sqlite, etc.)
});

// Meng-export sequelize untuk digunakan di model lain
module.exports = sequelize;
