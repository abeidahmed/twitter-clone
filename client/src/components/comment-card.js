import React, { useState } from 'react';
import cn from 'classnames';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { useModalType } from 'store/modal';
import { useCurrentUser } from 'store/current-user';
import { withPartialMonth } from 'utils/date-time';
import { voteComment } from 'api/vote-comment';
import { deleteComment } from 'api/delete-comment';
import * as q from 'shared/query-key';
import { Avatar } from './avatar';
import { CommentButton } from './comment-button';
import {
  TwitterActionButton,
  TextButton,
  IconButton,
  IconWithTextButton,
} from './button';
import { LikeButton } from './like-button';
import { CardContainer, DropdownContainer } from './container';
import { Icon } from './icon';
import { OutsideClickHandler } from './outside-click-handler';

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
  const { body, commenter, createdAt, meta, id, hasNestedComment } = comment;
  const { likes } = meta;

  return (
    <div>
      <CardContainer to="/" bordered={false}>
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
            <div className="mt-2">
              <p className="text-gray-600">{body}</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full max-w-md mt-1 -ml-2">
            <CommentBtn comment={comment} />
            <RetweetBtn />
            <LikeBtn likes={likes} commentID={id} />
            <ShareBtn />
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

function CommentBtn({ comment }) {
  const { body, commenter, createdAt, id, meta } = comment;
  const { name, twitterHandle, avatar } = commenter;
  const {
    comments: { totalComments },
  } = meta;

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

function LikeBtn({ likes, commentID }) {
  const [mutate, { isLoading }] = useRefetchMutation(voteComment, [
    q.SHOW_TWEET,
  ]);

  async function handleLike() {
    await mutate({
      id: commentID,
    });
  }

  return (
    <LikeButton
      size="sm"
      showCount={true}
      status={likes}
      disabled={isLoading}
      onClick={handleLike}
    />
  );
}

function RetweetBtn() {
  return (
    <TwitterActionButton
      icon="refresh"
      size="sm"
      color="green"
      className="relative"
    >
      4
    </TwitterActionButton>
  );
}

function ShareBtn() {
  return (
    <TwitterActionButton
      icon="upload"
      size="sm"
      color="teal"
      className="relative"
    />
  );
}
