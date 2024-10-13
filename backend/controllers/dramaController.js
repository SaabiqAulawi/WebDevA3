const Drama = require('../models/Drama');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const DramaGenre = require('../models/DramaGenre');
const DramaActor = require('../models/DramaActor');
// const { QueryTypes } = require('sequelize'); // Pastikan untuk mengimpor QueryTypes

// Mendapatkan drama dengan aktor dan genre
// Mengambil semua drama dengan detail
exports.getAllDramasWithDetails = async (req, res) => {
  try {
    console.log('Fetching dramas with details...');
    const dramas = await Drama.findAll({
      include: [
        {
          model: Genre,
          through: DramaGenre,
          as: 'genres'
        },
        {
          model: Actor,
          through: DramaActor,
          as: 'actors'
        }
      ]
    });
    
    console.log('Dramas fetched:', JSON.stringify(dramas, null, 2));
    
    if (dramas.length === 0) {
      return res.status(404).json({ message: 'No dramas found' });
    }
    
    res.json(dramas);
  } catch (error) {
    console.error('Error fetching dramas with details:', error);
    res.status(500).json({ error: 'Failed to fetch dramas', details: error.message });
  }
};
// Mendapatkan semua drama
// exports.getAllDramas = async (req, res) => {
//   try {
//     const dramas = await Drama.findAll({
//       attributes: ['title', 'alternativetitle', 'year', 'award_name', 'synopsis', 'availability']
//     });
//     res.json(dramas);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch dramas' });
//   }
// };

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
