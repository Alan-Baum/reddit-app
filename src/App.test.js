import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import postsReducer, { loadData } from './features/posts/postsSlice';
import subredditsReducer, { setSubreddits, selectSubreddit } from './features/subreddits/subredditsSlice';
import searchTermReducer, { setSearchTerm } from './features/searchTerm/searchTermSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    subreddits: subredditsReducer,
    searchTerm: searchTermReducer,
  },
});

// Prefill state
store.dispatch(loadData([
  {
    data: { id: '1', title: 'Test Post', author: 'TestUser', score: 100, num_comments: 5, subreddit: 'r/popular' },
  },
]));
store.dispatch(setSubreddits(['r/popular', 'r/test']));
store.dispatch(selectSubreddit('r/popular'));
store.dispatch(setSearchTerm(''));

test('renders Reddit Posts heading and test post', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Heading
  expect(screen.getByText(/Reddit Posts/i)).toBeInTheDocument();

  // Post title
  const postTitle = await screen.findByText(/Test Post/i);
  expect(postTitle).toBeInTheDocument();

  // Subreddit buttons
  expect(screen.getByText(/r\/popular/)).toBeInTheDocument();
  expect(screen.getByText(/r\/test/)).toBeInTheDocument();
});
