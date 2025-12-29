import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit) => {
    const response = await fetch(`https://www.reddit.com/${subreddit}.json`);
    const json = await response.json();
    return json.data.children;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: { posts: [], isLoading: false, hasError: false },
  reducers: {
    loadData: (state, action) => {
      state.posts = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
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

export const { loadData } = postsSlice.actions;
export default postsSlice.reducer;
