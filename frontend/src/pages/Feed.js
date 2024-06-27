import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../services/api';
import socket from '../socket';
import Post from '../components/Post';
import '../components/Feed.css';
import { Link } from 'react-router-dom';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    fetchPosts()
      .then(data => {
        setPosts(data);
        setLoading(false); // Turn off loading indicator
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setLoading(false); // Handle loading state in case of error
      });

    socket.on('likeUpdated', updatedPost => {
      setPosts(prevPosts => prevPosts.map(post => {
        if (post._id === updatedPost.postId) {
          return { ...post, likes: updatedPost.likes };
        }
        return post;
      }));
    });

    socket.on('commentAdded', updatedPost => {
      setPosts(prevPosts => prevPosts.map(post => {
        if (post._id === updatedPost._id) {
          return updatedPost;
        }
        return post;
      }));
    });

    socket.on('newPost', newPost => {
      setPosts(prevPosts => [...prevPosts, newPost]);
    });

    return () => {
      socket.off('likeUpdated');
      socket.off('commentAdded');
      socket.off('newPost');
    };
  }, []);

  const handleLike = postId => {
    socket.emit('likePost', postId);
  };

  const handleComment = (postId, comment) => {
    socket.emit('addComment', { postId, comment });
  };

  return (
    <div className="feed">
      <h1>Feed</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="post-container">
          {posts.map(post => (
            <Post
              key={post._id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
