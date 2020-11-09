const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/users.controller');

router.get('/:userId', userCtrl.findOneById);

module.exports = router;