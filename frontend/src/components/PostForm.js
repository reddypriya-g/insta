import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PostForm.css'; // Import the CSS file for styles

const PostForm = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const history = useNavigate();

  const handleFileChange = (event) => {
    // setImage(event.target.files[0]);
    const file = event.target.files[0];
    // Check if file size exceeds 5MB
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB. Please upload a smaller file.');
      event.target.value = null; // Clear file input
      setImage(null); // Reset state
    } else {
      setImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
        alert('Please select an image to upload.');
        return;
      }
  
    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post created:', response.data);
      // Clear form after successful upload
      setImage(null);
      setDescription('');
      // Redirect to feed page
      history('/feed');
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  };

  return (
    <div className="post-form">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description..."
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default PostForm;

