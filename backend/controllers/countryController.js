const Country = require('../models/Country');

// Mendapatkan semua negara
exports.getAllCountries = async (req, res) => {
  try {
    const countries = await Country.findAll({
      attributes: ['id', 'name'] // Ambil hanya id, name
    });
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};

// Membuat negara baru
exports.createCountry = async (req, res) => {
  try {
    const { name } = req.body; // Ambil nama negara dari body request
    const newCountry = await Country.create({ name });
    res.status(201).json(newCountry); // Menggunakan status 201 untuk created
  } catch (error) {
    console.error(error); // Tambahkan log untuk debugging
    res.status(500).json({ error: 'Failed to create country' });
  }
};

// Memperbarui negara
exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body; // Ambil nama negara dari body request
    const country = await Country.findByPk(id);
    if (!country) return res.status(404).json({ error: 'Country not found' });
    await country.update({ name });
    res.json(country);
  } catch (error) {
    console.error(error); // Tambahkan log untuk debugging
    res.status(500).json({ error: 'Failed to update country' });
  }
};

// Menghapus negara
exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findByPk(id);
    if (!country) return res.status(404).json({ error: 'Country not found' });
    await country.destroy();
    res.json({ message: 'Country deleted successfully' });
  } catch (error) {
    console.error(error); // Tambahkan log untuk debugging
    res.status(500).json({ error: 'Failed to delete country' });
  }
};
