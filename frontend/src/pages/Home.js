import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  const handleFeedClick = () => {
    navigate('/feed');
  };

  return (
    <div className="home-container">
      <h1>Instagram-like Project</h1>
      <div className="button-container">
        <button className="nav-button" onClick={handleUploadClick}>
          Upload
        </button>
        <button className="nav-button" onClick={handleFeedClick}>
          Feed
        </button>
      </div>
    </div>
  );
};

export default Home;
