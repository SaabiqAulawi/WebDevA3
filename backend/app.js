const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const actorRoutes = require('./routes/actorRoutes');
const awardRoutes = require('./routes/awardRoutes');
const commentRoutes = require('./routes/commentRoutes');
const countryRoutes = require('./routes/countryRoutes');
const dramaRoutes = require('./routes/dramaRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/actors', actorRoutes);
app.use('/api/awards', awardRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/dramas', dramaRoutes);
app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});
