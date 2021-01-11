const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comments.controller');

router.post('/', commentsCtrl.createComment);
router.put('/', commentsCtrl.modifyComment);
router.delete('/', commentsCtrl.deleteComment);

module.exports = router;