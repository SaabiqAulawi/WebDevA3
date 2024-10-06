const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

// Mendapatkan semua negara
router.get('/', countryController.getAllCountries);

// Menambahkan negara baru
router.post('/', countryController.createCountry);

// Memperbarui negara
router.put('/:id', countryController.updateCountry);

// Menghapus negara
router.delete('/:id', countryController.deleteCountry);

module.exports = router;
