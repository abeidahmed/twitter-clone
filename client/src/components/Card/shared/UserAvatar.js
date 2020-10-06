import React from 'react';
import { Avatar } from 'components/Avatar';

function UserAvatar({ showLine, user, size = 'md' }) {
  const { avatar, twitterHandle } = user;

  return (
    <div className="flex flex-col items-center">
      <div className="flex-shrink-0">
        <Avatar size={size} src={avatar} alt={twitterHandle} />
      </div>
      {showLine && <div className="flex-1 w-0.5 py-4 my-2 bg-gray-300"></div>}
    </div>
  );
}

export default UserAvatar;
