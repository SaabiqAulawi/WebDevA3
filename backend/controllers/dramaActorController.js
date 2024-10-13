const DramaActor = require('../models/DramaActor');
const Actor = require('../models/Actor');

// Mendapatkan aktor berdasarkan ID drama
exports.getActorsByDramaId = async (req, res) => {
  const { dramaId } = req.params; // Mendapatkan dramaId dari parameter

  try {
    // Mencari hubungan antara Drama dan Actor melalui DramaActor
    const dramaActors = await DramaActor.findAll({
      where: { drama_id: dramaId },
      include: [{ model: Actor, attributes: ['name'] }], // Menghubungkan dengan model Actor
    });

    // Menyiapkan respon dengan hanya nama aktor
    const actors = dramaActors.map(da => da.Actor.name);
    res.json(actors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch actors' });
  }
};
