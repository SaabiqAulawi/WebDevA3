const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/database');

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser());
// app.use(bodyParser.json());


// Models Association Setup
// Object.values(sequelize.models).forEach(model => {
//   if (model.associate) {
//     model.associate(sequelize.models);
//   }
// });

// Routes
const authRoute = require('./routes/auth.route');
const countryRoutes = require('./routes/countryRoutes');
const actorRoutes = require('./routes/actorRoutes');
const commentRoutes = require('./routes/commentRoutes');
const dramaRoutes = require('./routes/dramaRoutes');

const genreRoutes = require('./routes/genreRoutes');
const dramaGenreRoutes = require('./routes/dramaGenreRoutes');
const dramaActorRoutes = require('./routes/dramaActorRoutes');
//const authRoutes = require('./routes/authRoutes');

// Register Routes
app.use('/api/auth', authRoute);
app.use('/api/countries', countryRoutes);
app.use('/api/actors', actorRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/dramas', dramaRoutes);

app.use('/api/genres', genreRoutes);
app.use('/api/drama-genres', dramaGenreRoutes);
app.use('/api/drama-actors', dramaActorRoutes);
//app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Menjalankan server
app.listen(port, async () => {
  try {
    await connectDB(); // Pastikan koneksi database berhasil sebelum server berjalan
    console.log(`🚀 Server is running on port ${port}`);
  } catch (error) {
    console.error('❌ Unable to start the server due to database connection error:', error);
  }
});