const express = require("express");
const router = express.Router();
const db = require('../database');

// Middleware to parse JSON bodies
router.use(express.json());

// GET All Posts from the Posts Table
router.get("/", (request, response) => {
    const getAllPostsQuery = `SELECT * FROM posts ORDER BY post_id`;
    db.all(getAllPostsQuery, [], (error, resultRows) => {
        if (error) {
            return response.status(500).json({ error: error.message });
        }
        response.json({ posts: resultRows });
    });
});

// GET Single Post by ID
router.get("/:id", (request, response) => {
    const postId = request.params.id;
    const singlePostQuery = `SELECT * FROM posts WHERE post_id = ?`;
    db.get(singlePostQuery, [postId], (error, result) => {
        if (error) {
            return response.status(500).json({ error: error.message });
        } else if (!result) {
            return response.status(404).json({ error: "Post not found" });
        }
        response.json({ post: result });
    });
});

// POST Add a New Post
router.post("/", (request, response) => {
    const { post_title, post_content, post_author } = request.body;
    console.log("Received post data:", { post_title, post_content, post_author }); // Debug log

    // Check if all required fields are provided
    if (!post_title || !post_content || !post_author) {
        return response.status(400).json({ error: "All fields (post_title, post_content, post_author) are required" });
    }

    const postAddingQuery = `
        INSERT INTO posts (post_title, post_content, post_author) 
        VALUES (?, ?, ?)
    `;
    db.run(postAddingQuery, [post_title, post_content, post_author], function (error) {
        if (error) {
            return response.status(500).json({ error: error.message });
        }
        response.status(201).json({ postID: this.lastID });
    });
});

// PUT Update a Post by ID
router.put("/:id", (request, response) => {
    const postId = request.params.id;
    const { post_title, post_content, post_author } = request.body;
    console.log("Received update data:", { post_title, post_content, post_author }); // Debug log

    const postUpdatingQuery = `
        UPDATE posts 
        SET post_title = ?, post_content = ?, post_author = ?
        WHERE post_id = ?
    `;
    db.run(postUpdatingQuery, [post_title, post_content, post_author, postId], function (error) {
        if (error) {
            return response.status(500).json({ error: error.message });
        } else if (this.changes === 0) {
            return response.status(404).json({ error: "Post not found" });
        }
        response.json({ message: "Post updated successfully" });
    });
});

// DELETE a Post by ID
router.delete("/:id", (request, response) => {
    const postId = request.params.id;
    const postDeletingQuery = `DELETE FROM posts WHERE post_id = ?`;
    db.run(postDeletingQuery, [postId], function (error) {
        if (error) {
            return response.status(500).json({ error: error.message });
        } else if (this.changes === 0) {
            return response.status(404).json({ error: "Post not found" });
        }
        response.json({ message: "Post deleted successfully" });
    });
});

module.exports = router;
