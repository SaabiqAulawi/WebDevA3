const DramaGenre = require('../models/DramaGenre');
const Genre = require('../models/Genre');

// Mendapatkan genre berdasarkan ID drama
exports.getGenresByDramaId = async (req, res) => {
  const { dramaId } = req.params; // Mendapatkan dramaId dari parameter

  try {
    // Mencari hubungan antara Drama dan Genre melalui DramaGenre
    const dramaGenres = await DramaGenre.findAll({
      where: { drama_id: dramaId },
      include: [{ model: Genre, attributes: ['name'] }], // Menghubungkan dengan model Genre
    });

    // Menyiapkan respon dengan hanya nama genre
    const genres = dramaGenres.map(dg => dg.Genre.name);
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
};
