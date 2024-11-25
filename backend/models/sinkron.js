const { sequelize } = require("../config/database");
const User = require("./user.model");
console.log(User);

(async () => {
  try {
    await sequelize.sync({ alter: true }); // alter: Menyesuaikan tabel tanpa menghapus data
    console.log("✅ Model synced successfully.");
  } catch (error) {
    console.error("❌ Error syncing model:", error.message);
  }
})();

(async () => {
    try {
      const users = await User.findAll(); // Ambil semua data dari tabel Users
      console.log("Users:", users);
    } catch (error) {
      console.error("❌ Error querying Users table:", error.message);
    }
  })();