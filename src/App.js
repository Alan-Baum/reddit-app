import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts } from './features/posts/postsSlice';
import { selectSubreddit } from './features/subreddits/subredditsSlice';
import { selectSearchTerm } from './features/searchTerm/searchTermSlice';

import SubredditList from './components/SubredditList';
import PostList from './components/PostList';
import SearchBar from './components/SearchBar';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const selectedSubreddit = useSelector(
    (state) => state.subreddits.selectedSubreddit
  );

  const searchTerm = useSelector(selectSearchTerm);

  const posts = useSelector((state) => state.posts.posts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const hasError = useSelector((state) => state.posts.hasError);

  // 🚫 Prevent real API calls during tests
  useEffect(() => {
    if (
      selectedSubreddit &&
      process.env.NODE_ENV !== 'test'
    ) {
      dispatch(fetchPosts(selectedSubreddit));
    }
  }, [dispatch, selectedSubreddit]);

  const filteredPosts = posts.filter((post) =>
    post.data.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Reddit Posts</h1>

      <SubredditList />
      <SearchBar />

      {isLoading && <p>Loading posts...</p>}
      {hasError && <p>Error loading posts.</p>}

      {!isLoading && !hasError && (
        <PostList posts={filteredPosts} />
      )}
    </div>
  );
}

export default App;
