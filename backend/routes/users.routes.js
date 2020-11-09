const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/users.controller');

router.get('/:userId', userCtrl.findOneById);


/*router.get('/:userId', userCtrl.seeProfile);
router.get('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);

router.put('/:userId', userCtrl.modifyProfile);
router.delete('/:userId', userCtrl.deleteProfile);*/

module.exports = router;