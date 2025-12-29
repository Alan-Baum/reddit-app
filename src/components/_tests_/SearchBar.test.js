import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import SearchBar from '../SearchBar';

test('renders search input and updates value', () => {
  render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );

  const input = screen.getByPlaceholderText(/search posts/i);
  fireEvent.change(input, { target: { value: 'react' } });
  expect(input.value).toBe('react');
});
