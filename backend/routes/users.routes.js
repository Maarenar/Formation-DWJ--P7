const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/users.controller');

router.post('/signup', userCtrl.signup); //OK
router.delete('/:userId', userCtrl.deleteProfile); //OK
router.get('/:userId', userCtrl.userProfile); //OK

/*
router.put('/:userId', userCtrl.modifyProfile);
router.post('/login', userCtrl.login);
*/

module.exports = router; 