import React from 'react';
import Post from './Post';

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p>No posts to display.</p>;
  }

  return (
    <ul className="post-container">
      {posts.map((post) => (
        <Post key={post.data?.id || post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
