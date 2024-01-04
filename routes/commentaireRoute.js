const express = require('express');
const router = express.Router();
const commentaireController = require('../controller/commentaireController')
const middleware = require('../middleware/middleware')

//Mettre les routes de notre table celbrite
router.get('/getAll', middleware.authenticator, commentaireController.getAll)
router.get('/create', middleware.authenticator, middleware.checkAdmin, commentaireController.post)
router.get('/technologie/:technologieId', commentaireController.getCommentByTechno)
router.get('/technologie/:utilisateurId', commentaireController.getCommentByUser)
router.get('/avant/:date', commentaireController.getCommentByDate)


module.exports = router