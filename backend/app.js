const express = require('express');
const bodyParser = require('body-parser');
const countryRoutes = require('./routes/countryRoutes');
const actorRoutes = require('./routes/actorRoutes');
const commentRoutes = require('./routes/commentRoutes');
const dramaRoutes = require('./routes/dramaRoutes');
const userRoutes = require('./routes/userRoutes');
const genreRoutes = require('./routes/genreRoutes');
const dramaGenreRoutes = require('./routes/dramaGenreRoutes');
const dramaActorRoutes = require('./routes/dramaActorRoutes');

require('dotenv').config();
const sequelize = require('./config/database');

const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors'); // Import cors

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
