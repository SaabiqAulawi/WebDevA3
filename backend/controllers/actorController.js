const Actor = require('../models/Actor');

exports.getAllActors = async (req, res) => {
  try {
    const actors = await Actor.findAll();
    res.json(actors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch actors' });
  }
};

exports.createActor = async (req, res) => {
  try {
    const { country, name, birthDate, photo } = req.body;
    const newActor = await Actor.create({ country, name, birthDate, photo });
    res.json(newActor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create actor' });
  }
};

exports.updateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const { country, name, birthDate, photo } = req.body;
    const actor = await Actor.findByPk(id);
    if (!actor) return res.status(404).json({ error: 'Actor not found' });
    await actor.update({ country, name, birthDate, photo });
    res.json(actor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update actor' });
  }
};

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
