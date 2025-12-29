import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import SubredditList from '../SubredditList';

test('renders subreddit buttons', () => {
  render(
    <Provider store={store}>
      <SubredditList />
    </Provider>
  );

  expect(screen.getByText(/r\/popular/i)).toBeInTheDocument();
  expect(screen.getByText(/r\/javascript/i)).toBeInTheDocument();
});
