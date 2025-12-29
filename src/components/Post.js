import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchComments, clearComments } from '../features/comments/commentsSlice';
import PostModal from './PostModal';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    dispatch(clearComments());
    if (data.permalink) {
      dispatch(fetchComments(data.permalink));
    }
    setShowModal(true);
  };

  // ✅ supports BOTH Reddit API data and test mock data
  const data = post.data || post || {};

  const imageUrl =
    data.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, '&');

  let postType = '📝';
  if (imageUrl) postType = '🖼';
  else if (data.url?.startsWith('http')) postType = '🔗';

  return (
    <>
      <li className="post" onClick={handleClick}>
        <div className="post-votes">
          <span>▲</span>
          <span>{data.score || 0}</span>
          <span>▼</span>
        </div>

        <div className="post-content">
          <div className="post-title">
            {postType} {data.title}
          </div>

          {imageUrl && (
            <img
              src={imageUrl}
              alt={data.title}
              className="post-image"
            />
          )}

          <div className="post-meta">
            Posted by <strong>u/{data.author}</strong>
          </div>

          <div className="post-meta">
            💬 {data.num_comments} comments
          </div>
        </div>
      </li>

      {showModal && (
        <PostModal post={data} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Post;

