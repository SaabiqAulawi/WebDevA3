const Drama = require('../models/Drama');

exports.getAllDramas = async (req, res) => {
  try {
    const dramas = await Drama.findAll();
    res.json(dramas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dramas' });
  }
};

exports.createDrama = async (req, res) => {
  try {
    const {
      title,
      alternativeTitle,
      year,
      country,
      synopsis,
      availability,
      genres,
      actors,
      trailerLink,
      award,
    } = req.body;
    const newDrama = await Drama.create({
      title,
      alternativeTitle,
      year,
      country,
      synopsis,
      availability,
      genres,
      actors,
      trailerLink,
      award,
    });
    res.json(newDrama);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create drama' });
  }
};

exports.updateDrama = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const drama = await Drama.findByPk(id);
    if (!drama) return res.status(404).json({ error: 'Drama not found' });
    await drama.update(updatedData);
    res.json(drama);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update drama' });
  }
};

exports.deleteDrama = async (req, res) => {
  try {
    const { id } = req.params;
    const drama = await Drama.findByPk(id);
    if (!drama) return res.status(404).json({ error: 'Drama not found' });
    await drama.destroy();
    res.json({ message: 'Drama deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete drama' });
  }
};
