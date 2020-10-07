import React from 'react';
import { withPartialMonth } from 'utils/dateTime';
import { UserHoverableCard } from 'components/Card';
import { TextButton } from 'components/Button';

function UserInfo({ user, tweet }) {
  const { twitterHandle, name } = user;
  const { createdAt } = tweet;

  return (
    <div className="flex items-center">
      <UserHoverableCard
        hoverTo={
          <TextButton
            to={`/users/${twitterHandle}`}
            appearance="black"
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
      <span className="text-sm leading-5 text-gray-500">
        {withPartialMonth(createdAt)}
      </span>
    </div>
  );
}

export default UserInfo;
