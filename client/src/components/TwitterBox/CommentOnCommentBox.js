import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import * as q from 'shared/query-key';
import TwitterBox from './TwitterBox';
import { createCommentonComment } from 'api/create-comment';
import { useModalType } from 'store/modal';

function CommentOnCommentBox({ rows, commentID }) {
  const [body, setBody] = useState('');
  const { modalOff } = useModalType();

  const [mutate, { isLoading }] = useRefetchMutation(createCommentonComment, [
    q.SHOW_TWEET,
  ]);

  async function handleSubmit() {
    await mutate({
      commentID,
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

CommentOnCommentBox.propTypes = {
  rows: PropTypes.number,
  commentID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CommentOnCommentBox;
