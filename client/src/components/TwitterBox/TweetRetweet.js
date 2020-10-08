import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import * as q from 'shared/queryKey';
import TwitterBox from './TwitterBox';
import { createTweetRetweet } from 'api/create-retweet';
import { useModalType } from 'store/modal';

function TweetRetweet({ rows }) {
  const [body, setBody] = useState('');
  const {
    modalOff,
    modalProps: { tweetID },
  } = useModalType();

  const [mutate, { isLoading }] = useRefetchMutation(createTweetRetweet, [
    q.ALL_TWEETS,
    q.SHOW_TWEET,
  ]);

  async function handleSubmit() {
    await mutate({
      tweetID,
      body,
    });
    setBody('');
    modalOff();
  }

  return (
    <TwitterBox
      rows={rows}
      canUploadImage={false}
      placeholder="Add a comment"
      buttonLabel="Retweet"
      handleSubmit={handleSubmit}
      body={body}
      setBody={setBody}
      isLoading={isLoading}
      noPadding={false}
    />
  );
}

TweetRetweet.propTypes = {
  rows: PropTypes.number,
};

export default TweetRetweet;
