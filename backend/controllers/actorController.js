const Actor = require('../models/Actor');
const Country = require('../models/Country');

// Mendapatkan semua aktor
exports.getAllActors = async (req, res) => {
  try {
    const actors = await Actor.findAll({
      include: [{
        model: Country,
        as: 'country', // Pastikan 'as' sesuai dengan yang ada di model
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
    const { name, birthdate, photolink, country_id } = req.body;

    // Tambahkan log untuk memeriksa data yang diterima
    console.log('Data diterima:', { name, birthdate, photolink, country_id });

    const newActor = await Actor.create({ name, birthdate, photolink, country_id });
    res.status(201).json(newActor);
  } catch (error) {
    console.error('Error creating actor:', error);
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
    console.error('Error updating actor:', error);
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
    console.error('Error deleting actor:', error);
    res.status(500).json({ error: 'Failed to delete actor' });
  }
};
