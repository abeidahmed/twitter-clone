import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Icon } from 'components/Icon';

function RetweetButton({ status = {}, size = 'sm', showCount, ...props }) {
  const { isRetweeted, totalRetweets } = status;

  const iconClass = cn([
    'rounded-full',
    {
      'w-5 h-5': size === 'sm',
      'w-6 h-6': size === 'md',
      'text-green-500': isRetweeted,
    },
  ]);

  const countTextClass = cn([
    'leading-5',
    {
      'text-green-500': isRetweeted,
    },
  ]);

  return (
    <button
      className="relative inline-flex items-center text-sm text-gray-500 group focus:outline-none hover:text-green-500 focus:text-green-500"
      {...props}
    >
      <i className="p-2 rounded-full group-hover:bg-green-50 group-focus:bg-green-50">
        {isRetweeted ? (
          <Icon
            icon="refresh-solid"
            stroke="none"
            fill="currentColor"
            viewBox="0 0 20 20"
            className={iconClass}
          />
        ) : (
          <Icon icon="refresh" className={iconClass} />
        )}
      </i>
      {showCount && <span className={countTextClass}>{totalRetweets}</span>}
    </button>
  );
}

RetweetButton.propTypes = {
  status: PropTypes.object,
  size: PropTypes.oneOf(['sm', 'md']),
  showCount: PropTypes.bool,
};

export default RetweetButton;
