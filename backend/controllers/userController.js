const User = require('../models/User');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role'] // Specify which attributes to return
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Tambahkan password di sini

    // Check if username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, // Set password yang sudah di-hash
      role: 'User' // Explicitly set to 'User'
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Memperbarui pengguna dengan beberapa atribut
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    // Validasi role jika ada
    if (role && !["Admin", "User"].includes(role)) {
      return res.status(400).json({ error: "Invalid role value" });
    }

    // Validasi email jika ada
    if (email && !isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Cari user berdasarkan ID
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update data user
    const updatedData = { username, email, role };

    // Hash password jika ada
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    await user.update(updatedData);
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Menghapus pengguna
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari user berdasarkan ID
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Hapus user
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
