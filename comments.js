// Ceate web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

// Create express server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Store comments
const commentsByPostId = {};

// Get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a comment for a post
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // Get comments for a post
  const comments = commentsByPostId[req.params.id] || [];

  // Add new comment to comments
  comments.push({ id: commentId, content });

  // Update comments for a post
  commentsByPostId[req.params.id] = comments;

  // Send back comment
  res.status(201).send(comments);
});

// Listen to port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});