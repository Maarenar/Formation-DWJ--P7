const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/users.controller');

router.get('/:userId', userCtrl.userProfile);
router.post('/login/:email', userCtrl.login);

/*

router.put('/:userId', userCtrl.modifyProfile);
router.post('/signup', userCtrl.signup);

router.delete('/:userId', userCtrl.deleteProfile);*/

module.exports = router; 