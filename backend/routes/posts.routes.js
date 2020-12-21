const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts.controller');

router.get('/', postsCtrl.getAllPosts);

/*
router.post('/', postsCtrl.createPost); 
router.put('/:id', auth , postsCtrl.updatePost);
router.delete('/:id', auth , postsCtrl.deletePost);
*/

module.exports = router;