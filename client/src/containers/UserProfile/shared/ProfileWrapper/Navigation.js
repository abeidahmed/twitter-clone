import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'components/Tab';

function Navigation({ twitterHandle }) {
  const links = [
    {
      title: 'Tweets',
      path: `/users/${twitterHandle}`,
      exact: true,
    },
    {
      title: 'Tweets & replies',
      path: `/users/${twitterHandle}/tweets_replies`,
      exact: true,
    },
    {
      title: 'Media',
      path: `/users/${twitterHandle}/media`,
      exact: true,
    },
    {
      title: 'Likes',
      path: `/users/${twitterHandle}/likes`,
      exact: true,
    },
  ];

  return (
    <div className="mt-3 -mx-4">
      <Tab links={links} />
    </div>
  );
}

Navigation.propTypes = {
  twitterHandle: PropTypes.string,
};

export default Navigation;
