const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts.controller');

router.get('/', postsCtrl.getAllPosts);
router.post('/', postsCtrl.createPost);
router.put('/', postsCtrl.modifyPost);
router.delete('/', postsCtrl.deletePost);


module.exports = router;