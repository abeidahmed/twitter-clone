import React from 'react';
import cn from 'classnames';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { useModalType } from 'store/modal';
import { withPartialMonth } from 'utils/date-time';
import { voteComment } from 'api/vote-comment';
import * as q from 'shared/query-key';
import { Avatar } from './avatar';
import { CommentButton } from './comment-button';
import { TwitterActionButton, TextButton } from './button';
import { LikeButton } from './like-button';
import { CardContainer } from './container';

export function CommentCard({ comment }) {
  const commentContainerClass = cn({
    'border-b border-gray-200': !comment.hasNestedComment,
  });

  return (
    <div className={commentContainerClass}>
      <CommentContainer comment={comment} />

      {comment.comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

function CommentContainer({ comment }) {
  const { body, commenter, createdAt, meta, id, hasNestedComment } = comment;
  const { likes } = meta;

  return (
    <div>
      <CardContainer to="/" bordered={false}>
        <div className="flex flex-col items-center">
          <div className="flex-shrink-0">
            <Avatar size="md" src="" alt="" />
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
                  to={`/${comment.twitterHandle}`}
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
              {/* {twitter.id === currentUser.id && <TweetCardOption tweetID={id} />} */}
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
