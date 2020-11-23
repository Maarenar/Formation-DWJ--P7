const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts.controller');

router.get('/:postId', postsCtrl.getOnePost);


/*
router.get('/', postsCtrl.getAllPosts);
router.post('/', auth , postsCtrl.createPost);
router.get('/author/:id', auth , postsCtrl.getPostAuthor);
router.get('/number-of-comment/:id', auth , postsCtrl.numberOfComment);
router.get('/post-comments/:id', auth , postsCtrl.getPostComments);
router.put('/:id', auth , postsCtrl.updatePost);
router.delete('/:id', auth , postsCtrl.deletePost);*/

module.exports = router;