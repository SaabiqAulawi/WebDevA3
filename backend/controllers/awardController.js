const Award = require('../models/Award');

exports.getAllAwards = async (req, res) => {
  try {
    const awards = await Award.findAll();
    res.json(awards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch awards' });
  }
};

exports.createAward = async (req, res) => {
  try {
    const { country, year, name } = req.body;
    const newAward = await Award.create({ country, year, name });
    res.json(newAward);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create award' });
  }
};

exports.updateAward = async (req, res) => {
  try {
    const { id } = req.params;
    const { country, year, name } = req.body;
    const award = await Award.findByPk(id);
    if (!award) return res.status(404).json({ error: 'Award not found' });
    await award.update({ country, year, name });
    res.json(award);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update award' });
  }
};

exports.deleteAward = async (req, res) => {
  try {
    const { id } = req.params;
    const award = await Award.findByPk(id);
    if (!award) return res.status(404).json({ error: 'Award not found' });
    await award.destroy();
    res.json({ message: 'Award deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete award' });
  }
};
