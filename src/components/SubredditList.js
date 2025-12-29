import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubreddit } from '../features/subreddits/subredditsSlice';

const SubredditList = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector((state) => state.subreddits.subreddits);
  const selectedSubreddit = useSelector(
    (state) => state.subreddits.selectedSubreddit
  );

  const handleClick = (subreddit) => {
    dispatch(selectSubreddit(subreddit));
  };

  return (
    <ul className="subreddit-list">
      {subreddits.map((subreddit) => (
        <li
          key={subreddit}
          className={subreddit === selectedSubreddit ? 'selected' : ''}
          onClick={() => handleClick(subreddit)}
        >
          r/{subreddit}
        </li>
      ))}
    </ul>
  );
};

export default SubredditList;
