import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/icon';
import { CardContainer } from './container';
import { TextButton, TwitterActionButton, IconButton } from './button';
import { Avatar } from './avatar';
import { LikeButton } from './like-button';
import { CommentButton } from './comment-button';
import { AspectRatio } from './aspect-ratio';

export function RetweetCard() {
  return (
    <CardContainer to="/" bordered={true}>
      <Retweeter name="Yukhiro Matsumoto Retweeted" linkTo="/" />
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <Avatar size="md" src="" alt="" />
        </div>
        <div className="flex flex-col flex-1">
          <div>
            <div className="flex items-center justify-between">
              <UserDetail
                name="Ujin Tamang"
                twitterHandle="ujinmama"
                date="26 Sep"
              />
              <div className="relative">
                <IconButton size="sm" color="primary-text">
                  <Icon icon="chevron-down" className="w-4 h-4" />
                </IconButton>
              </div>
            </div>
            <div>
              <p className="text-gray-600">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Architecto, distinctio. Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Maiores expedita culpa tenetur iure.
              </p>
            </div>
            <section className="relative p-3 mt-2 transition duration-150 ease-in-out border border-gray-200 rounded-lg hover:bg-gray-200">
              <Link to="/" className="absolute inset-0"></Link>
              <div className="flex items-center space-x-2">
                <Avatar size="xs" src="" alt="" />
                <UserDetail
                  name="Tashy Sherpa"
                  twitterHandle="tashymams"
                  date="31 Oct"
                />
              </div>
              <div>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Sunt, placeat?
                </p>
              </div>
              <figure className="mt-3">
                <AspectRatio
                  src="https://images.unsplash.com/photo-1552435053-01c010307582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
                  alt="attachment"
                  ratio="16:9"
                />
              </figure>
            </section>
          </div>
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
        </div>
      </div>
    </CardContainer>
  );
}

function Retweeter({ name, linkTo }) {
  return (
    <p className="relative flex items-center mb-1 space-x-3 text-xs text-gray-500 ml-7">
      <Icon icon="refresh" className="w-3 h-3" />
      <Link to={linkTo} className="hover:underline">
        {name}
      </Link>
    </p>
  );
}

function UserDetail({ name, twitterHandle, date, linkTo }) {
  return (
    <div className="flex items-center">
      <TextButton
        to={linkTo}
        color="black"
        size="sm"
        className="relative font-bold"
      >
        {name}
      </TextButton>
      <span className="pl-2 text-sm leading-5 text-gray-500">
        @{twitterHandle}
      </span>
      <span className="mx-1">&middot;</span>
      <span className="text-sm leading-5 text-gray-500">{date}</span>
    </div>
  );
}
