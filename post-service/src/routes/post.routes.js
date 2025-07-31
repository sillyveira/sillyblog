const express = require('express');
const postController = require('../controllers/post.controller');
const router = express.Router();

// Public route - get all posts with pagination
router.get('/', postController.getAllPosts);

// Protected routes (require authentication)
router.post('/', postController.createPost);
router.delete('/:id', postController.deletePost);

module.exports = router;
