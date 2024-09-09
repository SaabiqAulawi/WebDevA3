const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const newUser = await User.create({ name, email, role });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update({ role });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

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
