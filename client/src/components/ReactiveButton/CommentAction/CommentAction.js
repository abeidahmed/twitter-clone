import React from 'react';
import {
  CommentButton,
  RetweetButton,
  LikeButton,
  ShareButton,
} from './components';

function CommentAction({ comment }) {
  const { meta, id } = comment;
  const { likes } = meta;

  return (
    <>
      <CommentButton comment={comment} />
      <RetweetButton />
      <LikeButton likes={likes} commentID={id} />
      <ShareButton comment={comment} />
    </>
  );
}

export default CommentAction;
