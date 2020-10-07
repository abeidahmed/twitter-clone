import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import { createTweet } from 'api/create-tweet';
import * as q from 'shared/query-key';
import TwitterBox from './TwitterBox';

function TweetBox({ rows }) {
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [replyStatus] = useState('everyone');

  const [mutate, { isLoading }] = useRefetchMutation(createTweet, [
    q.ALL_TWEETS,
    q.SHOW_USER,
  ]);

  async function handleSubmit() {
    await mutate({
      body,
      image,
      replyStatus,
    });
    setBody('');
    setImage('');
  }

  return (
    <TwitterBox
      rows={rows}
      canUploadImage={true}
      placeholder="What's happening?"
      buttonLabel="Tweet"
      handleSubmit={handleSubmit}
      body={body}
      setBody={setBody}
      setImage={setImage}
      isLoading={isLoading}
    />
  );
}

TweetBox.propTypes = {
  rows: PropTypes.number,
};

export default TweetBox;
