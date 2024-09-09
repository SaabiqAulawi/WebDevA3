const Country = require('../models/Country');

exports.getAllCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};

exports.createCountry = async (req, res) => {
  try {
    const { name, isDefault } = req.body;
    const newCountry = await Country.create({ name, isDefault });
    res.json(newCountry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create country' });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isDefault } = req.body;
    const country = await Country.findByPk(id);
    if (!country) return res.status(404).json({ error: 'Country not found' });
    await country.update({ name, isDefault });
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update country' });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findByPk(id);
    if (!country) return res.status(404).json({ error: 'Country not found' });
    await country.destroy();
    res.json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete country' });
  }
};
