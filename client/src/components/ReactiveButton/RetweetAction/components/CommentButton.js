import React from 'react';
import { useModalType } from 'store/modal';
import { CommentButton } from 'components/Button';

function CommentBtn({ showCount, tweet }) {
  const {
    id,
    meta: { comments } = {},
    retweeter,
    body,
    createdAt,
    retweetable,
  } = tweet;
  const { name, twitterHandle, avatar } = retweeter;
  const {
    id: nestedID,
    body: nestedBody,
    createdAt: nestedCreatedAt,
    twitter: {
      name: twitterName,
      twitterHandle: twitterTwitterHandle,
      avatar: twitterAvatar,
    } = {},
  } = retweetable;
  const { modalOn, types } = useModalType();

  const nestedContent = {
    tweetID: nestedID,
    twitterName,
    twitterTwitterHandle,
    twitterAvatar,
    tweetBody: nestedBody,
    tweetCreatedAt: nestedCreatedAt,
  };

  const regularContent = {
    tweetID: id,
    twitterName: name,
    twitterTwitterHandle: twitterHandle,
    twitterAvatar: avatar,
    tweetBody: body,
    tweetCreatedAt: createdAt,
  };

  function handleComment() {
    modalOn({
      modalType: types.CREATE_COMMENT_ON_RETWEET,
      modalProps: body ? { ...regularContent } : { ...nestedContent },
    });
  }

  return (
    <CommentButton
      size="sm"
      showCount={showCount}
      count={comments.totalComments}
      onClick={handleComment}
    />
  );
}

export default CommentBtn;
