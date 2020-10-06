import React from 'react';
import { UserInfo, CardContainer, Content } from '../../shared';
import { IconButton } from 'components/Button';
import { Avatar } from 'components/Avatar';
import { RetweetActionButtons } from 'components/ReactiveButton';
import { Icon } from 'components/Icon';
import NestedTweet from './NestedTweet';

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
              <UserInfo user={retweeter} tweet={{ createdAt }} />
              <div className="relative">
                <IconButton size="sm" appearance="minimal">
                  <Icon icon="chevron-down" className="w-4 h-4" />
                </IconButton>
              </div>
            </div>
            <Content body={body} />
            <NestedTweet nestedTweet={retweetable} />
          </div>
          <RetweetActionButtons />
        </div>
      </div>
    </CardContainer>
  );
}

export default QuoteTweetCard;
