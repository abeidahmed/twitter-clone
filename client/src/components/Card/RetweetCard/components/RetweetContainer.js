import React from 'react';
import { UserInfo, Figure, CardContainer, Content } from '../../shared';
import { Avatar } from 'components/Avatar';
import { IconButton } from 'components/Button';
import { Icon } from 'components/Icon';
import { RetweetActionBtn } from 'components/retweet-action-btn';
import RetweeterInfo from './RetweeterInfo';
import NestedTweet from './NestedTweet';

function RetweetCard({ tweet }) {
  const { retweeter, retweetable } = tweet;
  const { nestedTweet } = retweetable;

  return (
    <CardContainer to="/" bordered={true}>
      <RetweeterInfo user={retweeter} />
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
              <UserInfo
                user={retweetable.twitter}
                tweet={{ createdAt: retweetable.createdAt }}
              />
              <div className="relative">
                <IconButton size="sm" appearance="minimal">
                  <Icon icon="chevron-down" className="w-4 h-4" />
                </IconButton>
              </div>
            </div>
            <div>
              <Content body={retweetable.body} />
              <NestedTweet nestedTweet={nestedTweet} />
              <Figure image={retweetable.image} />
            </div>
          </div>
          <RetweetActionBtn />
        </div>
      </div>
    </CardContainer>
  );
}

export default RetweetCard;
