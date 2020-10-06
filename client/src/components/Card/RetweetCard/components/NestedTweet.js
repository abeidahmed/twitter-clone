import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'components/Avatar';
import { UserInfo, Content, Figure } from 'components/Card/shared';

function NestedTweet({ nestedTweet }) {
  if (nestedTweet) {
    const { twitter, createdAt, body, image } = nestedTweet;

    return (
      <section className="relative p-3 mt-2 transition duration-150 ease-in-out border border-gray-200 rounded-lg hover:bg-gray-200">
        <Link to="/" className="absolute inset-0"></Link>
        <div className="flex items-center space-x-2">
          <Avatar size="xs" src={twitter.avatar} alt={twitter.twitterHandle} />
          <UserInfo user={twitter} tweet={{ createdAt: createdAt }} />
        </div>
        <Content body={body} />
        <Figure image={image} />
      </section>
    );
  }
  return null;
}

export default NestedTweet;
