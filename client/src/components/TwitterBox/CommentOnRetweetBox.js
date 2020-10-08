import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import * as q from 'shared/queryKey';
import TwitterBox from './TwitterBox';
import { createCommentonRetweet } from 'api/create-comment';
import { useModalType } from 'store/modal';

function CommentOnRetweetBox({ rows, retweetID }) {
  const [body, setBody] = useState('');
  const { modalOff } = useModalType();

  const [mutate, { isLoading }] = useRefetchMutation(createCommentonRetweet, [
    q.ALL_RETWEETS,
  ]);

  async function handleSubmit() {
    await mutate({
      retweetID,
      content: body,
    });
    setBody('');
    modalOff();
  }

  return (
    <TwitterBox
      rows={rows}
      canUploadImage={false}
      placeholder="Reply to this comment"
      buttonLabel="Reply"
      handleSubmit={handleSubmit}
      body={body}
      setBody={setBody}
      isLoading={isLoading}
      noPadding={true}
    />
  );
}

CommentOnRetweetBox.propTypes = {
  rows: PropTypes.number,
  retweetID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CommentOnRetweetBox;
