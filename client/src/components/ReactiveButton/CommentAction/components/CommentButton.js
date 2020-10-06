import React from 'react';
import { useModalType } from 'store/modal';
import { CommentButton } from 'components/Button';

function CommentBtn({ comment }) {
  const {
    body,
    commenter,
    createdAt,
    id,
    meta: { comments: { totalComments } = {} } = {},
  } = comment;
  const { name, twitterHandle, avatar } = commenter;

  const { modalOn, types } = useModalType();

  function handleComment() {
    modalOn({
      modalType: types.CREATE_COMMENT_ON_COMMENT,
      modalProps: {
        commentID: id,
        commenterName: name,
        commenterTwitterHandle: twitterHandle,
        commenterAvatar: avatar,
        commentBody: body,
        commentCreatedAt: createdAt,
      },
    });
  }

  return (
    <CommentButton
      size="sm"
      showCount={true}
      count={totalComments}
      onClick={handleComment}
    />
  );
}

export default CommentBtn;
