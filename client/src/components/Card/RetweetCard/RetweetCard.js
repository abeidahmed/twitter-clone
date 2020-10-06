import React from 'react';
import { RetweetContainer, QuoteTweetCard } from './components';

function RetweetCard({ tweet }) {
  const { body } = tweet;

  if (body) {
    return <QuoteTweetCard tweet={tweet} />;
  }
  return <RetweetContainer tweet={tweet} />;
}

export default RetweetCard;
