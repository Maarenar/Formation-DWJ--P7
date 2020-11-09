const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/coms.controller');

router.post('/', auth , postsCtrl.createComment);
router.get('/:id', auth , postsCtrl.getCommentAuthor);
router.put('/:id', auth , postsCtrl.updateComment);
router.delete('/:id', auth , postsCtrl.deleteComemnt);

module.exports = router;