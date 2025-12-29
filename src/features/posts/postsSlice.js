import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit) => {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}.json`,
      {
        headers: {
          // Reddit REQUIRES a User-Agent in production
          'User-Agent': 'reddit-app:v1.0.0 (by /u/anonymous)',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const json = await response.json();
    return json.data.children;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false; // reset error
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
