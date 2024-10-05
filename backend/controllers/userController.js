const User = require('../models/User');

// Mendapatkan semua pengguna
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Membuat pengguna baru
exports.createUser = async (req, res) => {
  try {
    const { username, email, role } = req.body; // Ambil data pengguna dari body request
    const newUser = await User.create({ username, email, role });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Memperbarui pengguna
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body; // Ambil role dari body request
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update({ role });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Menghapus pengguna
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
