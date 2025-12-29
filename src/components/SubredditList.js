import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSubreddits,
  selectSubreddit,
} from '../features/subreddits/subredditsSlice';

const SubredditList = () => {
  const dispatch = useDispatch();
  const { subreddits, selectedSubreddit } = useSelector(
    (state) => state.subreddits
  );

  useEffect(() => {
    if (!subreddits.length) {
      dispatch(setSubreddits(['r/popular', 'r/javascript']));
      dispatch(selectSubreddit('r/popular')); // 🔥 THIS triggers fetchPosts
    }
  }, [dispatch, subreddits.length]);

  return (
    <ul className="subreddit-list">
      {subreddits.map((sr) => (
        <li
          key={sr}
          className={sr === selectedSubreddit ? 'selected' : ''}
          onClick={() => dispatch(selectSubreddit(sr))}
        >
          {sr}
        </li>
      ))}
    </ul>
  );
};

export default SubredditList;

