const sequelize = require('./config/database'); // Sesuaikan dengan path file Anda
const Country = require('./models/Country'); // Sesuaikan dengan path file Anda
require('dotenv').config();

// Menguji koneksi ke database dan sinkronisasi model
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return Country.sync(); // Untuk membuat tabel jika belum ada
  })
  .then(() => {
    console.log('Country model has been synchronized with the database.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });