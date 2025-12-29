import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import subredditsReducer from '../features/subreddits/subredditsSlice';
import searchTermReducer from '../features/searchTerm/searchTermSlice';
import commentsReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    subreddits: subredditsReducer,
    searchTerm: searchTermReducer,
    comments: commentsReducer,
  },
});
