import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearComments } from '../features/comments/commentsSlice';

const PostModal = ({ post, onClose }) => {
  const dispatch = useDispatch();
  const { comments, isLoading, hasError } = useSelector((state) => state.comments);

  const handleClose = () => {
    dispatch(clearComments());
    onClose();
  };

  if (!post) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>×</button>

        <h2>{post.title}</h2>
        <p><strong>Posted by:</strong> u/{post.author}</p>
        <p><strong>Score:</strong> {post.score}</p>
        {post.post_hint === 'image' && (
          <img src={post.url} alt="Post" className="modal-image" />
        )}
        {post.url && post.post_hint !== 'image' && (
          <p><strong>Link:</strong> <a href={post.url} target="_blank" rel="noreferrer">{post.url}</a></p>
        )}

        <h3>Comments</h3>
        {isLoading && <p>Loading comments...</p>}
        {hasError && <p>Failed to load comments.</p>}
        <ul>
          {comments.map((comment) => {
            if (!comment.data.body) return null;
            return <li key={comment.data.id}>{comment.data.body}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default PostModal;
