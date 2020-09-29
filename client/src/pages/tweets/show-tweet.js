import React from 'react';
import { useSetTitle } from 'store/page-title';
import { Avatar } from 'components/avatar';
import { TextButton, IconButton, TwitterActionButton } from 'components/button';
import { Icon } from 'components/icon';

function ShowTweet() {
  useSetTitle('Tweet', null);

  return (
    <article className="py-3">
      <div className="px-4 border-b border-gray-200">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Avatar size="lg" src="" alt="" />
            </div>
            <div className="ml-3">
              <TextButton
                to="/"
                color="black"
                size="sm"
                className="relative font-bold"
              >
                ICC
              </TextButton>
              <span className="block text-sm leading-5 text-gray-500">
                @icc
              </span>
            </div>
          </div>
          <div>
            <IconButton size="sm" color="primary-text">
              <Icon icon="chevron-down" className="w-4 h-4" />
            </IconButton>
          </div>
        </div>
        <section className="mt-4">
          <p className="text-xl leading-8">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi,
            dolor. Quae, dolorum? Nam nostrum, libero unde dolor explicabo
            doloribus mollitia ipsum nihil minima quidem optio perferendis
            maxime dolorum eum quisquam.
          </p>
          {/* <div
            className="relative mt-3 overflow-hidden rounded-lg shadow-md"
            style={{ paddingBottom: '66.66%' }}
          >
            <img
              src=""
              alt="twitter"
              className="absolute object-cover w-full h-full overflow-hidden"
            />
          </div> */}
          <div className="flex items-center py-3 text-sm text-gray-500 border-b border-gray-200">
            <span>9:45 AM</span>
            <span className="mx-1">&middot;</span>
            <span>Sep 29, 2020</span>
          </div>
          <div className="flex items-center py-3 space-x-4 text-sm text-gray-500 border-b border-gray-200">
            <p>
              <span className="font-semibold text-gray-900">32</span>
              <span className="pl-1">Retweets</span>
            </p>
            <p>
              <span className="font-semibold text-gray-900">4</span>
              <span className="pl-1">Quote Tweets</span>
            </p>
            <p>
              <span className="font-semibold text-gray-900">798</span>
              <span className="pl-1">Likes</span>
            </p>
          </div>
          <div className="flex items-center justify-between w-full max-w-lg py-1 mx-auto">
            <TwitterActionButton
              icon="chat"
              size="md"
              color="blue"
              className="relative"
            ></TwitterActionButton>
            <TwitterActionButton
              icon="refresh"
              size="md"
              color="green"
              className="relative"
            ></TwitterActionButton>
            <TwitterActionButton
              icon="heart"
              size="md"
              color="red"
              className="relative"
            ></TwitterActionButton>
            <TwitterActionButton
              icon="upload"
              size="md"
              color="teal"
              className="relative"
            />
          </div>
        </section>
      </div>
    </article>
  );
}

export default ShowTweet;
