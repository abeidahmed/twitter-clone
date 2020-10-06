import React from 'react';
import cn from 'classnames';
import { CommentContainer } from './components';

function CommentCard({ comment, twitterID }) {
  const commentContainerClass = cn({
    'border-b border-gray-200': !comment.hasNestedComment,
  });

  return (
    <div className={commentContainerClass}>
      <CommentContainer comment={comment} twitterID={twitterID} />

      {comment.comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} twitterID={twitterID} />
      ))}
    </div>
  );
}

export default CommentCard;
