import React from 'react';
import { useModalType } from 'store/modal';
import { CommentButton } from 'components/Button';

function CommentBtn({ tweet, user, size, showCount }) {
  const { id, body, createdAt, meta = {}, twitter = user } = tweet;
  const { comments } = meta;

  const { modalOn, types } = useModalType();

  function handleComment() {
    modalOn({
      modalType: types.CREATE_COMMENT_ON_TWEET,
      modalProps: {
        tweetID: id,
        twitterName: twitter.name,
        twitterTwitterHandle: twitter.twitterHandle,
        twitterAvatar: twitter.avatar,
        tweetBody: body,
        tweetCreatedAt: createdAt,
      },
    });
  }

  return (
    <CommentButton
      size={size}
      showCount={showCount}
      count={comments.totalComments}
      onClick={handleComment}
    />
  );
}

export default CommentBtn;
