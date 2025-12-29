// src/components/Comments.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '../features/comments/commentsSlice';
import subredditsReducer from '../features/subreddits/subredditsSlice';
import Comments from './Comments';

const store = configureStore({
  reducer: {
    comments: commentsReducer,
    subreddits: subredditsReducer,
  },
});

// Minimal subreddit state to avoid destructuring errors
store.dispatch({ type: 'subreddits/setSubreddits', payload: ['r/popular', 'r/test'] });
store.dispatch({ type: 'subreddits/selectSubreddit', payload: 'r/popular' });

test('renders comments section', () => {
  render(
    <Provider store={store}>
      <Comments />
    </Provider>
  );

  // If Comments renders a <ul> for comment list, check for that
  const commentList = screen.getByRole('list'); // gets the <ul>
  expect(commentList).toBeInTheDocument();
});
