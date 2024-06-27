import React, { useState } from 'react';
import './Feed.css';

const Post = ({ post, onLike, onComment }) => {
  const { _id, image, description, likes, comments } = post;
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      onComment(_id, newComment); // Emit comment to server via Socket.io
      setNewComment(''); // Clear input after adding comment
    }
  };

  return (
    <div className="post-card">
      <img src={`https://insta-api-delta.vercel.app/uploads/${image}`} alt={description} />
      <div className='post-content'>
      {post.description && <p className="post-description"><b>caption :</b> {post.description}</p> }
      <div className='like'> <button onClick={() => onLike(_id)}>Like ({likes})</button></div>
      <div className='comments'>
        <h3>Comments</h3>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <div className='input'>
     <input
        type="text"
        placeholder="Add a comment..."
        value={newComment}
        onChange={handleCommentChange}
      />
      </div>
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
    </div>
  );
};

export default Post;
