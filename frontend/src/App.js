import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PostForm from './components/PostForm';
import Feed from './pages/Feed';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/upload" element={<PostForm/>} />
        <Route path="/feed" element={<Feed/>} />
      </Routes>
    </Router>
  );
};

export default App;
