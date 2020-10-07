import React from 'react';
import { Avatar } from 'components/Avatar';
import Navigation from './Navigation';
import DynamicFollowBtn from './FollowButton';
import UserInfo from './UserInfo';
import { Banner } from 'components/Banner';

function ProfileWrapper({ user, children }) {
  const { twitterHandle, avatar } = user;

  return (
    <main>
      <div className="flex flex-col px-4 border-b border-gray-200">
        <div className="-mx-4">
          <Banner
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=967&amp;q=80"
            alt={twitterHandle}
          />
        </div>
        <div className="flex justify-between">
          <div className="-mt-10 lg:-mt-16">
            <Avatar
              size="xl"
              variant="bordered"
              src={avatar}
              alt={twitterHandle}
            />
          </div>
          <div className="py-2">
            <DynamicFollowBtn user={user} />
          </div>
        </div>
        <UserInfo user={user} />
        <Navigation twitterHandle={twitterHandle} />
      </div>
      {children}
    </main>
  );
}

export default ProfileWrapper;
