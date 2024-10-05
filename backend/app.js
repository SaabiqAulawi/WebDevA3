const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Rute yang diimpor
const actorRoutes = require('./routes/actorRoutes');
const commentRoutes = require('./routes/commentRoutes');
const countryRoutes = require('./routes/countryRoutes');
const dramaRoutes = require('./routes/dramaRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rute API
app.use('/api/actors', actorRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/dramas', dramaRoutes);
app.use('/api/users', userRoutes);

// Sinkronisasi database dan menjalankan server
sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
