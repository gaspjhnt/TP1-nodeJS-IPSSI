const express = require('express');
const router = express.Router();
const technologieController = require('../controller/technologieController');
const middleware = require('../middleware/middleware')

router.get('/getAll', technologieController.getAllTechnologies);
router.get('/get/:id', technologieController.getTechnologieById);
router.post('/create', middleware.checkAdmin, technologieController.createTechnologie);
router.put('/update/:id', middleware.checkAdmin, technologieController.updateTechnologie);
router.delete('/delete/:id', middleware.checkAdmin, technologieController.deleteTechnologie);

module.exports = router;
