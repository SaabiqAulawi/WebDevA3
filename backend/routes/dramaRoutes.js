const express = require('express');
const router = express.Router();
const dramaController = require('../controllers/dramaController');

router.get('/', dramaController.getAllDramas);
router.post('/', dramaController.createDrama);
router.put('/:id', dramaController.updateDrama);
router.delete('/:id', dramaController.deleteDrama);

module.exports = router;
