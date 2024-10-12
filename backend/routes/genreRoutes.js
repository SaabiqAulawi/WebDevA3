const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

// Mendapatkan semua genre
router.get('/', genreController.getAllGenres);

// Menambahkan genre baru
router.post('/', genreController.createGenre);

// Memperbarui genre
router.put('/:id', genreController.updateGenre);

// Menghapus genre
router.delete('/:id', genreController.deleteGenre);

module.exports = router;
