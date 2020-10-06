import React from 'react';
import PropTypes from 'prop-types';
import { useModalType } from 'store/modal';
import TweetStat from './TweetStat';

function TweetMeta({ tweet }) {
  const { modalOn, types } = useModalType();
  const {
    id,
    meta: { likes },
  } = tweet;

  function openLikesModal() {
    modalOn({
      modalType: types.LIKED_BY_LIST,
      modalProps: {
        id,
      },
    });
  }

  return (
    <div className="flex items-center py-3 space-x-4 text-sm text-gray-500 border-b border-gray-200">
      <TweetStat count={32} title="Retweet" />
      <TweetStat count={4} title="Quote Tweet" />
      <TweetStat
        count={likes.totalLikes}
        title="Like"
        onClick={openLikesModal}
      />
    </div>
  );
}

TweetMeta.propTypes = {
  tweet: PropTypes.object.isRequired,
};

export default TweetMeta;
