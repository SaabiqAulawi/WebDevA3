const Actor = require('../models/Actor');

// Mendapatkan semua aktor
exports.getAllActors = async (req, res) => {
  try {
    const actors = await Actor.findAll({
      include: [{
        model: Country,
        as: 'country',
        attributes: ['name']  // Hanya mengambil kolom `name`
      }]
    });
    res.json(actors);
  } catch (error) {
    console.error('Error fetching actors:', error);
    res.status(500).json({ error: 'Failed to fetch actors' });
  }
};

// Membuat aktor baru
exports.createActor = async (req, res) => {
  try {
    const { name, birthDate, photoLink, country_id } = req.body; // Sesuaikan dengan atribut yang diperlukan
    const newActor = await Actor.create({ name, birthDate, photoLink, country_id });
    res.json(newActor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create actor' });
  }
};

// Memperbarui aktor
exports.updateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthDate, photoLink, country_id } = req.body;
    const actor = await Actor.findByPk(id);
    if (!actor) return res.status(404).json({ error: 'Actor not found' });
    await actor.update({ name, birthDate, photoLink, country_id });
    res.json(actor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update actor' });
  }
};

// Menghapus aktor
exports.deleteActor = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);
    if (!actor) return res.status(404).json({ error: 'Actor not found' });
    await actor.destroy();
    res.json({ message: 'Actor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete actor' });
  }
};
