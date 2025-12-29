// src/components/_tests_/PostList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../../features/posts/postsSlice';
import PostList from '../PostList';

// Configure a test store
const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

// Mock posts data in the same shape your app uses (post.data)
const mockPosts = [
  {
    data: {
      id: '1',
      title: 'Post 1',
      author: 'User1',
      score: 10,
      num_comments: 2,
      post_hint: null,
      permalink: '/r/test/1',
    },
  },
  {
    data: {
      id: '2',
      title: 'Post 2',
      author: 'User2',
      score: 5,
      num_comments: 1,
      post_hint: null,
      permalink: '/r/test/2',
    },
  },
];

test('renders a list of posts', () => {
  render(
    <Provider store={store}>
      <PostList posts={mockPosts} />
    </Provider>
  );

  // Check that the post titles appear in the document
  expect(screen.getByText(/Post 1/)).toBeInTheDocument();
  expect(screen.getByText(/Post 2/)).toBeInTheDocument();

  // Optional: check authors and comments count
  expect(screen.getByText(/u\/User1/)).toBeInTheDocument();
  expect(screen.getByText(/u\/User2/)).toBeInTheDocument();
  expect(screen.getByText(/2 comments/)).toBeInTheDocument();
  expect(screen.getByText(/1 comments/)).toBeInTheDocument();
});
