const Genre = require('../models/Genre');

// Mendapatkan semua genre
exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
};

// Membuat genre baru
exports.createGenre = async (req, res) => {
  try {
    const { name } = req.body; // Ambil nama genre dari body request
    const newGenre = await Genre.create({ name });
    res.status(201).json(newGenre); // Menggunakan status 201 untuk created
  } catch (error) {
    res.status(500).json({ error: 'Failed to create genre' });
  }
};

// Memperbarui genre
exports.updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body; // Ambil nama genre dari body request
    const genre = await Genre.findByPk(id);
    if (!genre) return res.status(404).json({ error: 'Genre not found' });
    await genre.update({ name });
    res.json(genre);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update genre' });
  }
};

// Menghapus genre
exports.deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);
    if (!genre) return res.status(404).json({ error: 'Genre not found' });
    await genre.destroy();
    res.json({ message: 'Genre deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete genre' });
  }
};
