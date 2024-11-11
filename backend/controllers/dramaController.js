const Drama = require('../models/Drama');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const DramaGenre = require('../models/DramaGenre');
const DramaActor = require('../models/DramaActor');

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

exports.getDramaById = async (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL
  try {
      console.log(`Fetching drama details for ID: ${id}...`);
      const drama = await Drama.findOne({
          where: { id: id }, // Mencari drama berdasarkan ID
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

      if (!drama) {
          return res.status(404).json({ message: 'Drama not found' });
      }

      console.log('Drama fetched:', JSON.stringify(drama, null, 2));
      res.json(drama);
  } catch (error) {
      console.error('Error fetching drama details:', error);
      res.status(500).json({ error: 'Failed to fetch drama details', details: error.message });
  }
};

// Membuat drama baru
// dramaController.js
// const Drama = require('../models/Drama');
// const DramaGenre = require('../models/DramaGenre'); // Assosiasi drama-genre jika dibutuhkan
// const DramaActor = require('../models/DramaActor'); // Assosiasi drama-aktor jika dibutuhkan

// Fungsi untuk menambahkan drama baru
exports.createDrama = async (req, res) => {
  try {
    const { 
      title, 
      alternativetitle, 
      year, 
      country_id, 
      synopsis, 
      availability, 
      trailerlink, 
      award_name, 
      genres, 
      actors 
    } = req.body;

    // Buat data drama baru
    const newDrama = await Drama.create({
      title,
      alternativetitle,
      year,
      country_id,
      synopsis,
      availability,
      trailerlink,
      award_name
    });

    // Jika ada genre, tambahkan genre dengan assosiasi
    if (genres && genres.length > 0) {
      await Promise.all(genres.map(async (genreId) => {
        await DramaGenre.create({ drama_id: newDrama.id, genre_id: genreId });
      }));
    }

    // Jika ada aktor, tambahkan aktor dengan assosiasi
    if (actors && actors.length > 0) {
      await Promise.all(actors.map(async (actorId) => {
        await DramaActor.create({ drama_id: newDrama.id, actor_id: actorId });
      }));
    }

    res.status(201).json(newDrama);
  } catch (error) {
    console.error('Error creating drama:', error);
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