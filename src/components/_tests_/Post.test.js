import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Post from '../Post';

const samplePost = {
  data: {
    id: 'abc123',
    title: 'Test Post Title',
    author: 'TestAuthor',
    score: 42,
    num_comments: 5,
    permalink: '/r/test/comments/abc123',
    post_hint: 'text',
    url: '',
  },
};

test('renders post title, author, score, and comments', () => {
  render(
    <Provider store={store}>
      <Post post={samplePost.data} />
    </Provider>
  );

  expect(screen.getByText(/Test Post Title/i)).toBeInTheDocument();
  expect(screen.getByText(/u\/TestAuthor/i)).toBeInTheDocument();
  expect(screen.getByText(/42/)).toBeInTheDocument();
  expect(screen.getByText(/5 comments/i)).toBeInTheDocument();
});
