const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/comments.controller');

/*router.post('/', auth , postsCtrl.createComment);
router.put('/:id', auth , postsCtrl.updateComment);
router.delete('/:id', auth , postsCtrl.deleteComemnt);*/

module.exports = router;