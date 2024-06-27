const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer'); // Import multer
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: 'https://insta-frontend-five.vercel.app',
      methods: ['GET', 'POST'],
    },
  });

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')  // Destination folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // File naming strategy
  }
});

// const upload = multer({ storage: storage });
// File size limit (5MB)

const maxSize = 5 * 1024 * 1024; // 5MB in bytes

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize }, // Limiting file size
  fileFilter: (req, file, cb) => {
    // Validate file type or additional checks if needed
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported. Please upload an image file.'));
    }
  }
})
 
// POST route to create a new post
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { userId, description } = req.body;
    const image = req.file.filename; // Multer stores uploaded file details in req.file

    // Validate and save post to MongoDB
    const post = new Post({
      userId,
      image,
      description,
      likes: 0,
      comments: []
    });

    const savedPost = await post.save();
       // Emit new post to all clients
       io.emit('newPost', savedPost);
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.get('/', async (req, res) => {
    try {
      const posts = await Post.find(); // Fetch posts from MongoDB
      res.json(posts); // Send JSON response with posts data
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Failed to fetch posts' });
    }
  });
  
module.exports = router;
