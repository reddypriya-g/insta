const socketIo = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app); // Assuming 'app' is your Express application instance
const io = socketIo(server);

io.on('connection', socket => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('likePost', postId => {
    console.log(`User liked post ${postId}`);
    // Perform like logic and emit updates
    // Example: io.emit('likeUpdated', { postId, likes: newLikeCount });
  });

  socket.on('addComment', data => {
    console.log(`User added comment "${data.comment}" to post ${data.postId}`);
    // Perform comment logic and emit updates
    // Example: io.emit('commentAdded', updatedPost);
  });

  // Other event handlers...
});

module.exports = io;
