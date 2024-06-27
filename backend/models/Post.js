const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: String,
  image: String,
  description: String,
  likes: Number,
  comments: [String] 
});

module.exports = mongoose.model('Post', postSchema);
