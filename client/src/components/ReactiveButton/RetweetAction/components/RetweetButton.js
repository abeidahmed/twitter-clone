import React from 'react';
import { RetweetButton } from 'components/Button';

function RetweetBtn() {
  return (
    <RetweetButton
      status={{ isRetweeted: false, totalRetweets: 4 }}
      size="sm"
    />
  );
}

export default RetweetBtn;
