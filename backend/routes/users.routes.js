const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const userCtrl = require('../controllers/users.controller');

router.post('/signup', userCtrl.signup);  
router.post('/login', userCtrl.login); 
router.delete('/', userCtrl.deleteProfile); 
router.put('/',auth, userCtrl.editProfile);
router.post('/profile/', auth, userCtrl.userProfile); 


module.exports = router; 