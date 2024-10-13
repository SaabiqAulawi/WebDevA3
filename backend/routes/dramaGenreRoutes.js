const express = require('express');
const router = express.Router();
const dramaGenreController = require('../controllers/dramaGenreController');

// Mendapatkan semua genre berdasarkan ID drama
router.get('/:dramaId', dramaGenreController.getGenresByDramaId);

module.exports = router;
