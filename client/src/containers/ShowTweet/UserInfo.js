import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'components/Avatar';
import { TextButton } from 'components/Button';

function UserInfo({ user }) {
  const { avatar, twitterHandle, name } = user;

  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <Avatar size="lg" src={avatar} alt={twitterHandle} />
      </div>
      <div>
        <TextButton
          to={`/${twitterHandle}`}
          appearance="black"
          size="sm"
          className="relative font-bold"
        >
          {name}
        </TextButton>
        <span className="block text-sm leading-5 text-gray-500">
          @{twitterHandle}
        </span>
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserInfo;
