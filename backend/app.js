const express = require('express');
const bodyParser = require('body-parser');
const countryRoutes = require('./routes/countryRoutes');
const actorRoutes = require('./routes/actorRoutes');
const commentRoutes = require('./routes/commentRoutes');
const dramaRoutes = require('./routes/dramaRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Menggunakan routes
app.use('/api/countries', countryRoutes);
app.use('/api/actors', actorRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/dramas', dramaRoutes);
app.use('/api/users', userRoutes);

// Menjalankan server dan menghubungkan ke database
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
