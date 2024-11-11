const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

// Route yang hanya dapat diakses oleh Admin
router.get('/cms', authenticateToken, authorizeRole('Admin'), userController.cmsDashboard);

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
