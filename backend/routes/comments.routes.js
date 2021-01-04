const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comments.controller');

router.get('/postComments/:postId', commentsCtrl.getComments);

/*router.post('/', auth , postsCtrl.createComment);
router.put('/:id', auth , postsCtrl.updateComment);
router.delete('/:id', auth , postsCtrl.deleteComemnt);*/

module.exports = router;