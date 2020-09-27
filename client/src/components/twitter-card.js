import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from './avatar';
import { TextButton, TwitterActionButton } from './button';

export function TwitterCard({ tweet }) {
  const { body, createdAt, id, image, replyStatus, twitter } = tweet;
  return (
    <div className="relative border-b border-gray-200 hover:bg-gray-50">
      <Link to="/explore" className="absolute inset-0" />
      <div className="flex px-4 py-2">
        <div className="flex-shrink-0">
          <Avatar size="md" src={twitter.avatar} alt="" />
        </div>
        <div className="flex flex-col flex-1 ml-3">
          <div>
            <div className="flex items-center">
              <TextButton
                to={`/${twitter.twitterHandle}`}
                color="black"
                size="sm"
                className="relative font-bold"
              >
                {twitter.name}
              </TextButton>
              <span className="pl-2 text-sm leading-5 text-gray-500">
                @{twitter.twitterHandle}
              </span>
              <span className="mx-1">&middot;</span>
              <span className="text-sm leading-5 text-gray-500">
                {createdAt}
              </span>
            </div>
            <div className="mt-2">
              <p className="text-gray-600">{body}</p>
            </div>
            {image && (
              <div className="mt-3 overflow-hidden rounded-lg shadow-md">
                <img
                  src={image}
                  alt="twitter"
                  className="object-cover w-full h-80"
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between w-full max-w-md mt-1 -ml-2">
            <TwitterActionButton
              icon="chat"
              size="sm"
              color="blue"
              className="relative"
            >
              18
            </TwitterActionButton>
            <TwitterActionButton
              icon="refresh"
              size="sm"
              color="green"
              className="relative"
            >
              4
            </TwitterActionButton>
            <TwitterActionButton
              icon="heart"
              size="sm"
              color="red"
              className="relative"
            >
              23
            </TwitterActionButton>
            <TwitterActionButton
              icon="upload"
              size="sm"
              color="teal"
              className="relative"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
