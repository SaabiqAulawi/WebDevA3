const express = require('express');
const router = express.Router();
const dramaController = require('../controllers/dramaController');

// Remove or comment out this line if getAllDramas is not defined
// router.get('/', dramaController.getAllDramas);

// Use the getAllDramasWithDetails function instead
router.get('/with-details', dramaController.getAllDramasWithDetails);
router.get('/:id', dramaController.getDramaById); 
router.post('/', dramaController.createDrama);
router.put('/:id', dramaController.updateDrama);
router.delete('/:id', dramaController.deleteDrama);

module.exports = router;