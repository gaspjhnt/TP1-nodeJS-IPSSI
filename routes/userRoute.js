const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

//Mettre les routes de notre table celbrite
router.get('/getAll', userController.getAllUser)
router.get('/edit/:id', userController.put)
router.get('/delete/:id', userController.delete)
router.post('/register', userController.register)
router.post('/login', userController.login)



module.exports = router