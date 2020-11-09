const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts.controller');

router.post('/', auth , postsCtrl.createPost);
router.get('/', auth , postsCtrl.getAllPosts);
router.get('/:id', auth , postsCtrl.getOnePost);
router.get('/author/:id', auth , postsCtrl.getPostAuthor);
router.get('/number-of-comment/:id', auth , postsCtrl.numberOfComment);
router.get('/post-comments/:id', auth , postsCtrl.getPostComments);
router.put('/:id', auth , postsCtrl.updatePost);
router.delete('/:id', auth , postsCtrl.deletePost);

module.exports = router;