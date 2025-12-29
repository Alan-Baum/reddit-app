import React from 'react';
import { useSelector } from 'react-redux';

const Comments = () => {
  const comments = useSelector((state) => state.comments?.comments || []);

  return (
    <div className="comments-container">
      <h2>Comments section</h2>
      <ul>
        {comments.length ? comments.map((c) => (
          <li key={c.id}>{c.body}</li>
        )) : <li>No comments yet.</li>}
      </ul>
    </div>
  );
};

export default Comments;
