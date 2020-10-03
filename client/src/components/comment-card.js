import React, { useState } from 'react';
import cn from 'classnames';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { useCurrentUser } from 'store/current-user';
import { withPartialMonth } from 'utils/date-time';
import { deleteComment } from 'api/delete-comment';
import * as q from 'shared/query-key';
import { Avatar } from './avatar';
import { TextButton, IconButton, IconWithTextButton } from './button';
import { CardContainer, DropdownContainer } from './container';
import { Icon } from './icon';
import { OutsideClickHandler } from './outside-click-handler';
import { CommentActionBtn } from './comment-action-btn';

export function CommentCard({ comment, twitterID }) {
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

function CommentContainer({ comment, twitterID }) {
  const { body, commenter, createdAt, id, hasNestedComment } = comment;

  return (
    <div>
      <CardContainer to="/" bordered={false}>
        <div className="flex space-x-3">
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0">
              <Avatar
                size="md"
                src={commenter.avatar}
                alt={commenter.twitterHandle}
              />
            </div>
            {hasNestedComment && (
              <div className="flex-1 w-0.5 py-4 my-2 bg-gray-300"></div>
            )}
          </div>
          <div className="flex flex-col flex-1">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TextButton
                    to={`/${commenter.twitterHandle}`}
                    color="black"
                    size="sm"
                    className="relative font-bold"
                  >
                    {commenter.name}
                  </TextButton>
                  <span className="pl-2 text-sm leading-5 text-gray-500">
                    @{commenter.twitterHandle}
                  </span>
                  <span className="mx-1">&middot;</span>
                  <span className="text-sm leading-5 text-gray-500">
                    {withPartialMonth(createdAt)}
                  </span>
                </div>
                <CommentCardOption
                  commenterID={commenter.id}
                  twitterID={twitterID}
                  commentID={id}
                />
              </div>
              <div>
                <p className="text-gray-600">{body}</p>
              </div>
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

function CommentCardOption({ commenterID, twitterID, commentID }) {
  const [isActive, setIsActive] = useState(false);
  const { currentUser } = useCurrentUser();

  const [mutate, { isLoading }] = useRefetchMutation(deleteComment, [
    q.SHOW_TWEET,
    q.USER_COMMENTED_TWEETS,
    q.USER_LIKED_TWEETS,
    q.USER_MEDIA_TWEETS,
    q.ALL_BOOKMARKS,
  ]);

  async function handleDelete(id) {
    await mutate({ id });
  }

  if (commenterID === currentUser.id || twitterID === currentUser.id) {
    return (
      <OutsideClickHandler
        onOutsideClick={() => setIsActive(false)}
        className="relative"
      >
        <IconButton
          size="sm"
          color="primary-text"
          onClick={() => setIsActive(!isActive)}
        >
          <Icon icon="chevron-down" className="w-4 h-4" />
        </IconButton>
        <DropdownContainer position="top" isActive={isActive}>
          <IconWithTextButton
            color="danger"
            size="md"
            icon="trash"
            variant="menu"
            onClick={() => handleDelete(commentID)}
            disabled={isLoading}
          >
            Delete
          </IconWithTextButton>
        </DropdownContainer>
      </OutsideClickHandler>
    );
  }
  return null;
}
