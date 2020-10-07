import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import * as q from 'shared/queryKey';
import TwitterBox from './TwitterBox';
import { createCommentOnTweet } from 'api/create-comment';
import { useModalType } from 'store/modal';

function CommentOnTweetBox({ rows, tweetID }) {
  const [body, setBody] = useState('');
  const { modalOff } = useModalType();

  const [mutate, { isLoading }] = useRefetchMutation(createCommentOnTweet, [
    q.SHOW_TWEET,
  ]);

  async function handleSubmit() {
    await mutate({
      tweetID,
      content: body,
    });
    setBody('');
    modalOff();
  }

  return (
    <TwitterBox
      rows={rows}
      canUploadImage={false}
      placeholder="Tweet your reply"
      buttonLabel="Reply"
      handleSubmit={handleSubmit}
      body={body}
      setBody={setBody}
      isLoading={isLoading}
      noPadding={true}
    />
  );
}

CommentOnTweetBox.propTypes = {
  rows: PropTypes.number,
  tweetID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CommentOnTweetBox;
