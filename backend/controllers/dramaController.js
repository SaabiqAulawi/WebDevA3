const Drama = require('../models/Drama');

// Mendapatkan semua drama
exports.getAllDramas = async (req, res) => {
  try {
    const dramas = await Drama.findAll();
    res.json(dramas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dramas' });
  }
};

// Membuat drama baru
exports.createDrama = async (req, res) => {
  try {
    const {
      title,
      alternativeTitle,
      year,
      country_id,
      synopsis,
      availability,
      trailerLink,
      award_name,
    } = req.body; // Ambil data drama dari body request
    const newDrama = await Drama.create({
      title,
      alternativeTitle,
      year,
      country_id,
      synopsis,
      availability,
      trailerLink,
      award_name,
    });
    res.json(newDrama);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create drama' });
  }
};

// Memperbarui drama
exports.updateDrama = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body; // Ambil data yang ingin diperbarui
    const drama = await Drama.findByPk(id);
    if (!drama) return res.status(404).json({ error: 'Drama not found' });
    await drama.update(updatedData);
    res.json(drama);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update drama' });
  }
};

// Menghapus drama
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
