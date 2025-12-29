import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../features/searchTerm/searchTermSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);

  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={searchTerm}
      onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
    />
  );
};

export default SearchBar;
