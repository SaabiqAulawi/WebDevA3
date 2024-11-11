const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

const countryRoutes = require('./routes/countryRoutes');
const actorRoutes = require('./routes/actorRoutes');
const commentRoutes = require('./routes/commentRoutes');
const dramaRoutes = require('./routes/dramaRoutes');
const userRoutes = require('./routes/userRoutes');
const genreRoutes = require('./routes/genreRoutes');
const dramaGenreRoutes = require('./routes/dramaGenreRoutes');
const dramaActorRoutes = require('./routes/dramaActorRoutes');
const authRoutes = require('./routes/authRoutes'); // Tambahkan ini

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

Object.values(sequelize.models).forEach(model => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

// Menggunakan routes
app.use('/api/countries', countryRoutes);
app.use('/api/actors', actorRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/dramas', dramaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/drama-genres', dramaGenreRoutes);
app.use('/api/drama-actors', dramaActorRoutes);
app.use('/api/auth', authRoutes); // Rute autentikasi

// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Menghubungkan ke database tanpa sinkronisasi
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
