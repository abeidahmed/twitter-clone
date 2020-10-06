import React from 'react';
import PropTypes from 'prop-types';
import { TweetCard } from 'components/Card';
import ObjectNotFound from 'shared/not-found/object-not-found';

function DisplayTweets({ tweets, user, description, showComments }) {
  if (tweets.length) {
    return tweets.map((tweet) => (
      <TweetCard
        key={tweet.id}
        tweet={tweet}
        user={tweet.user || user}
        showComments={showComments}
      />
    ));
  }
  return <ObjectNotFound description={description} />;
}

DisplayTweets.propTypes = {
  tweets: PropTypes.array.isRequired,
  user: PropTypes.object,
  description: PropTypes.string,
  showComments: PropTypes.bool,
};

export default DisplayTweets;
