const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rute registrasi
router.post('/register', authController.register);

// Rute login
router.post('/login', authController.login);

module.exports = router;
