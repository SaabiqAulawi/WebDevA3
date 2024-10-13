const express = require('express');
const router = express.Router();
const dramaActorController = require('../controllers/dramaActorController');

// Mendapatkan semua aktor berdasarkan ID drama
router.get('/:dramaId', dramaActorController.getActorsByDramaId);

module.exports = router;
