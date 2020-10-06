import React from 'react';
import PropTypes from 'prop-types';
import { TweetCard } from 'components/Card';
import { SadFaceNotFound } from 'components/NotFound';

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
  return <SadFaceNotFound description={description} />;
}

DisplayTweets.propTypes = {
  tweets: PropTypes.array.isRequired,
  user: PropTypes.object,
  description: PropTypes.string,
  showComments: PropTypes.bool,
};

export default DisplayTweets;
