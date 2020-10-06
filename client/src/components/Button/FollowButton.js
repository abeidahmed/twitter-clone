import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './index';

function FollowButton({
  isFollowing,
  onUnfollow,
  onFollow,
  unfollowLoading,
  followLoading,
  size,
}) {
  const [buttonText, setButtonText] = useState('Following');
  const [buttonStyle, setButtonStyle] = useState('primary');

  const onHover = () => {
    setButtonText('Unfollow');
    setButtonStyle('danger');
  };

  const onNotHover = () => {
    setButtonText('Following');
    setButtonStyle('primary');
  };

  return (
    <>
      {isFollowing ? (
        <Button
          appearance={buttonStyle}
          size={size}
          disabled={unfollowLoading}
          onMouseEnter={onHover}
          onMouseLeave={onNotHover}
          onClick={onUnfollow}
        >
          {buttonText}
        </Button>
      ) : (
        <Button
          size={size}
          appearance="minimal"
          disabled={followLoading}
          onClick={onFollow}
        >
          Follow
        </Button>
      )}
    </>
  );
}

FollowButton.propTypes = {
  isFollowing: PropTypes.bool,
  onFollow: PropTypes.func,
  onUnfollow: PropTypes.func,
  unfollowLoading: PropTypes.bool,
  followLoading: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default FollowButton;
