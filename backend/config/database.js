const { Sequelize } = require("sequelize");

// Konfigurasi langsung koneksi ke PostgreSQL
const sequelize = new Sequelize("postgres", "postgres", "admin123", {
  host: "localhost", // Host database Anda
  port: 5432,        // Port default PostgreSQL
  dialect: "postgres", // Dialect PostgreSQL
  logging: false,    // Nonaktifkan logging query SQL (opsional)
});

// Fungsi untuk menghubungkan database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Database connected ${sequelize.config.host}`);
  } catch (error) {
    console.log('❌ Unable to connect to the database:', error.message);
    process.exit(1); // Keluar jika koneksi gagal
  }
};

module.exports = { sequelize, connectDB };


