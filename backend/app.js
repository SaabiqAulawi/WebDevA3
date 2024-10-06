const express = require('express');
const bodyParser = require('body-parser');
const countryRoutes = require('./routes/countryRoutes');
require('dotenv').config();
const sequelize = require('./config/database'); // Mengimpor konfigurasi database

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Menggunakan routes
app.use('/api/countries', countryRoutes);

// Menjalankan server dan menghubungkan ke database
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
