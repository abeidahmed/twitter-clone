import React from 'react';
import { Avatar } from './avatar';
import { CommentButton } from './comment-button';
import { TwitterActionButton, TextButton } from './button';
import { LikeButton } from './like-button';
import { CardContainer } from './container';
import { withPartialMonth } from 'utils/date-time';

export function CommentCard({ comment }) {
  return (
    <div>
      <CommentContainer comment={comment} />

      {comment.comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

function CommentContainer({ comment }) {
  const { body, commenter, createdAt, id, meta, hasNestedComment } = comment;
  const { likes, comments } = meta;

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
            <CommentBtn totalComments={comments.totalComments} />
            <RetweetBtn />
            <LikeBtn likes={likes} />
            <ShareBtn />
          </div>
        </div>
      </CardContainer>
    </div>
  );
}

function CommentBtn({ totalComments }) {
  return <CommentButton size="sm" showCount={true} count={totalComments} />;
}

function LikeBtn({ likes }) {
  return <LikeButton size="sm" showCount={true} status={likes} />;
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
