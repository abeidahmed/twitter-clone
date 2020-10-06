import React from 'react';
import PropTypes from 'prop-types';
import { TextButton } from 'components/Button';
import { pluralize } from 'utils/helpers';

function TweetStat({ count, title, ...props }) {
  return (
    <TextButton appearance="black" {...props}>
      <span className="text-sm font-semibold">{count}</span>
      <span className="pl-1 text-sm text-gray-500">
        {pluralize(count, title)}
      </span>
    </TextButton>
  );
}

TweetStat.propTypes = {
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default TweetStat;
