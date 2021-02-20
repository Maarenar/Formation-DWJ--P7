const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const postsCtrl = require('../controllers/posts.controller');

router.get('/', auth, postsCtrl.getAllPosts);
router.post('/', auth, postsCtrl.createPost); 
router.put('/', auth, postsCtrl.modifyPost);
router.delete('/', auth, postsCtrl.deletePost); 

module.exports = router;