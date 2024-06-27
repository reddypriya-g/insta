const express = require('express');
const http = require('http');
const  { Server }  = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const Post = require('./models/Post'); // Ensure Post model is imported

const postRoutes = require('./routes/postRoutes'); // Adjust path as needed

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
   cors: {
    origin: "https://insta-frontend-five.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header", "Content-Type"],
    credentials: true
  }
});
app.use('/uploads', express.static('uploads')); // Serve uploaded files

app.use(cors({
   origin: "https://insta-frontend-five.vercel.app", // Your frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "my-custom-header"],
  credentials: true
}));
app.use(express.json());

app.use('/api/posts', postRoutes); // Route for handling posts

app.get("/",(req,res)=>{
  res.send("welcome");
})
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('likePost', async (postId) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true });
      io.emit('likeUpdated', { postId, likes: updatedPost.likes }); // Emit updated like count
    } catch (err) {
      console.error('Error updating post like count:', err);
    }
  });

  socket.on('addComment', async ({ postId, comment }) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { comments: comment } }, { new: true });
      io.emit('commentAdded', updatedPost); // Emit updated post with new comment
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  });
    // Example: Handle new post creation and emit 'newPost' event
    socket.on('createPost', async (postData) => {
        try {
          // Save new post to MongoDB
          const newPost = await Post.create(postData);
    
          // Emit 'newPost' event to all clients
          io.emit('newPost', newPost);
        } catch (err) {
          console.error('Error creating post:', err);
        }
      });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect('mongodb+srv://reddypriya15072002:yuvi1212@cluster0.cbgjier.mongodb.net/insta', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error', err);
  });
