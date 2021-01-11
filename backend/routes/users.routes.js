const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/users.controller');

router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login);
router.delete('/', userCtrl.deleteProfile); 
router.put('/', userCtrl.editProfile);
router.get('/:userId', userCtrl.userProfile); 


module.exports = router; 