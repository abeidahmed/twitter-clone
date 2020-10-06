import React from 'react';
import { CardContainer, UserAvatar, UserInfo, Content } from '../../shared';
import { CommentActionBtn } from 'components/comment-action-btn';
import CardOption from './CardOption';

function CommentContainer({ comment, twitterID }) {
  const { body, commenter, createdAt, id, hasNestedComment } = comment;

  return (
    <div>
      <CardContainer to="/" bordered={false}>
        <div className="flex space-x-3">
          <UserAvatar user={commenter} showLine={hasNestedComment} />
          <div className="flex flex-col flex-1">
            <div>
              <div className="flex items-center justify-between">
                <UserInfo user={commenter} tweet={{ createdAt }} />
                <CardOption
                  commenterID={commenter.id}
                  twitterID={twitterID}
                  commentID={id}
                />
              </div>
              <Content body={body} />
            </div>
            <div className="flex items-center justify-between w-full max-w-md mt-1 -ml-2">
              <CommentActionBtn comment={comment} />
            </div>
          </div>
        </div>
      </CardContainer>
    </div>
  );
}

export default CommentContainer;
