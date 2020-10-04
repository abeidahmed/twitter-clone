import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/icon';
import { CardContainer } from './container';
import { TextButton, TwitterActionButton, IconButton } from './button';
import { Avatar } from './avatar';
import { LikeButton } from './like-button';
import { CommentButton } from './comment-button';
import { AspectRatio } from './aspect-ratio';
import { withPartialMonth } from 'utils/date-time';
import { UserHoverableCard } from './user-hoverable-card';

export function RetweetCollection({ tweet }) {
  const { body } = tweet;

  if (body) {
    return <QuoteTweetCard tweet={tweet} />;
  }
  return <RetweetCard tweet={tweet} />;
}

function RetweetCard({ tweet }) {
  const { retweeter, retweetable } = tweet;
  const { nestedTweet } = retweetable;

  return (
    <CardContainer to="/" bordered={true}>
      <Retweeter user={retweeter} />
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <Avatar
            size="md"
            src={retweetable.twitter.avatar}
            alt={retweetable.twitter.twitterHandle}
          />
        </div>
        <div className="flex flex-col flex-1">
          <div>
            <div className="flex items-center justify-between">
              <UserDetail
                user={retweetable.twitter}
                date={withPartialMonth(retweetable.createdAt)}
              />
              <div className="relative">
                <IconButton size="sm" color="primary-text">
                  <Icon icon="chevron-down" className="w-4 h-4" />
                </IconButton>
              </div>
            </div>
            <div>
              <p className="text-gray-600">{retweetable.body}</p>
              {nestedTweet && (
                <section className="relative p-3 mt-2 transition duration-150 ease-in-out border border-gray-200 rounded-lg hover:bg-gray-200">
                  <Link to="/" className="absolute inset-0"></Link>
                  <div className="flex items-center space-x-2">
                    <Avatar
                      size="xs"
                      src={nestedTweet.twitter.avatar}
                      alt={nestedTweet.twitter.twitterHandle}
                    />
                    <UserDetail
                      user={nestedTweet.twitter}
                      date={withPartialMonth(nestedTweet.createdAt)}
                    />
                  </div>
                  <div>
                    <p className="text-gray-600">{nestedTweet.body}</p>
                  </div>
                  {nestedTweet.image && (
                    <figure className="mt-3">
                      <AspectRatio
                        src={nestedTweet.image}
                        alt="attachment"
                        ratio="16:9"
                      />
                    </figure>
                  )}
                </section>
              )}
              {retweetable.image && (
                <figure className="mt-3">
                  <AspectRatio
                    src={retweetable.image}
                    alt="attachment"
                    ratio="16:9"
                  />
                </figure>
              )}
            </div>
          </div>
          <ActionButtons />
        </div>
      </div>
    </CardContainer>
  );
}

function QuoteTweetCard({ tweet }) {
  const { body, createdAt, retweetable, retweeter } = tweet;

  return (
    <CardContainer to="/" bordered={true}>
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <Avatar
            size="md"
            src={retweeter.avatar}
            alt={retweeter.twitterHandle}
          />
        </div>
        <div className="flex flex-col flex-1">
          <div>
            <div className="flex items-center justify-between">
              <UserDetail user={retweeter} date={withPartialMonth(createdAt)} />
              <div className="relative">
                <IconButton size="sm" color="primary-text">
                  <Icon icon="chevron-down" className="w-4 h-4" />
                </IconButton>
              </div>
            </div>
            <div>
              <p className="text-gray-600">{body}</p>
            </div>
            <section className="relative p-3 mt-2 transition duration-150 ease-in-out border border-gray-200 rounded-lg hover:bg-gray-200">
              <Link to="/" className="absolute inset-0"></Link>
              <div className="flex items-center space-x-2">
                <Avatar
                  size="xs"
                  src={retweetable.twitter.avatar}
                  alt={retweetable.twitter.twitterHandle}
                />
                <UserDetail
                  user={retweetable.twitter}
                  date={withPartialMonth(retweetable.createdAt)}
                />
              </div>
              <div>
                <p className="text-gray-600">{retweetable.body}</p>
              </div>
              {retweetable.image && (
                <figure className="mt-3">
                  <AspectRatio
                    src={retweetable.image}
                    alt="attachment"
                    ratio="16:9"
                  />
                </figure>
              )}
            </section>
          </div>
          <ActionButtons />
        </div>
      </div>
    </CardContainer>
  );
}

function ActionButtons() {
  return (
    <div className="flex items-center justify-between w-full max-w-md mt-1 -ml-2">
      <CommentButton size="sm" showCount={true} count={2} />
      <TwitterActionButton
        icon="refresh"
        size="sm"
        color="green"
        className="relative"
      >
        4
      </TwitterActionButton>
      <LikeButton
        size="sm"
        showCount={true}
        status={{ isLiked: true, totalLikes: 41 }}
      />
      <TwitterActionButton
        icon="upload"
        size="sm"
        color="teal"
        className="relative"
      />
    </div>
  );
}

function Retweeter({ user }) {
  const { name, twitterHandle } = user;

  return (
    <div className="relative inline-flex items-center mb-1 space-x-3 text-xs text-gray-500 ml-7">
      <Icon icon="refresh" className="w-3 h-3" />
      <UserHoverableCard
        hoverTo={
          <Link to={`/users/${twitterHandle}`} className="hover:underline">
            {`${name} Retweeted`}
          </Link>
        }
        user={user}
      />
    </div>
  );
}

function UserDetail({ user, date }) {
  const { name, twitterHandle } = user;

  return (
    <div className="flex items-center">
      <UserHoverableCard
        hoverTo={
          <TextButton
            to={`/users/${twitterHandle}`}
            color="black"
            size="sm"
            className="relative font-bold"
          >
            {name}
          </TextButton>
        }
        user={user}
      />
      <span className="pl-2 text-sm leading-5 text-gray-500">
        @{twitterHandle}
      </span>
      <span className="mx-1">&middot;</span>
      <span className="text-sm leading-5 text-gray-500">{date}</span>
    </div>
  );
}