const express = require('express');
const router = express.Router();

const app = express();

const authController = require('../controllers/authController');

//Rutas API
router.post('/signup', authController.postSignup);

router.post('/login', authController.postLogin);


module.exports = router;