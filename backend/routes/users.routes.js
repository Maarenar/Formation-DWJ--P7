const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/users.controller');

router.post('/signup', userCtrl.signup); // => OK!
router.post('/login', userCtrl.login);
router.get('/:userId', userCtrl.userProfile); //=OK

/*

router.delete('/:userId', userCtrl.deleteProfile);
router.put('/:userId', userCtrl.modifyProfile);
router.post('/signup', userCtrl.signup);

*/

module.exports = router; 