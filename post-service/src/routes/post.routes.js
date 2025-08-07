const express = require("express");
const { extractUserFromHeaders } = require("../utils/userHeaders");
const postController = require("../controllers/post.controller");
const router = express.Router();

// Public route - get all posts with pagination
router.get("/", postController.getAllPosts);

// Public route - get a specific post by ID
router.get("/:id", postController.getPostById);

// Protected routes (require authentication)
router.post("/", extractUserFromHeaders, postController.createPost);
router.put("/:id", extractUserFromHeaders, postController.updatePost);
router.delete("/:id", extractUserFromHeaders, postController.deletePost);

module.exports = router;
