import React from 'react';
import Post from './Post';

const PostList = ({ posts = [] }) => {
  if (!posts.length) return <p>No posts available.</p>;

  return (
    <ul className="post-container">
      {posts.map((post) => (
        <Post key={post.data?.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
