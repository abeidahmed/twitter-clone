import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from './avatar';
import { TextButton, TwitterActionButton } from './button';

export function TwitterCard() {
  return (
    <div className="relative border-b border-gray-200 hover:bg-gray-50">
      <Link to="/explore" className="absolute inset-0" />
      <div className="flex px-4 py-2">
        <div className="flex-shrink-0">
          <Avatar size="md" src="" alt="" />
        </div>
        <div className="flex flex-col ml-3">
          <div>
            <div className="flex text-sm">
              <TextButton
                to="/iamhawaabi"
                color="black"
                className="relative font-bold leading-5"
              >
                ICC
              </TextButton>
              <p className="pl-2 leading-5 text-gray-500">@icc</p>
              <span className="mx-1">&middot;</span>
              <p className="leading-5 text-gray-500">11m</p>
            </div>
            <div className="mt-2">
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse,
                alias aperiam in vitae, vero perferendis necessitatibus, ullam
                recusandae nihil libero pariatur nemo odio laudantium deserunt.
              </p>
            </div>
            {/* <div className="mt-3 overflow-hidden rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=967&amp;q=80"
                alt=""
                className="object-cover w-full h-80"
              />
            </div> */}
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
