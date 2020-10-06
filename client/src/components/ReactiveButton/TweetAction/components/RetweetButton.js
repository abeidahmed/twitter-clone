import React from 'react';
import { RetweetButton } from 'components/Button';

function RetweetBtn({ size, showCount }) {
  return (
    <RetweetButton
      status={{ isRetweeted: false, totalRetweets: 4 }}
      size={size}
      showCount={showCount}
    />
  );
}

export default RetweetBtn;
