import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (permalink) => {
    const response = await fetch(
      `https://corsproxy.io/?https://www.reddit.com${permalink}.json`
    );
    const json = await response.json();
    return json[1].data.children;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    isLoading: false,
    hasError: false
  },
  reducers: {
    clearComments(state) {
      state.comments = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
