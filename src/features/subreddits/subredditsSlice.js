import { createSlice } from '@reduxjs/toolkit';

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: { subreddits: [], selectedSubreddit: '' },
  reducers: {
    setSubreddits: (state, action) => {
      state.subreddits = action.payload;
    },
    selectSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    },
  },
});

export const { setSubreddits, selectSubreddit } = subredditsSlice.actions;
export default subredditsSlice.reducer;
