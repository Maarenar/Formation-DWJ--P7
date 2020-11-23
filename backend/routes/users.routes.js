const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/users.controller');

router.get('/:userId', userCtrl.userProfile);


/*
router.get('/login/:userEmail', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.put('/:userId', userCtrl.modifyProfile);
router.delete('/:userId', userCtrl.deleteProfile);*/

module.exports = router; 