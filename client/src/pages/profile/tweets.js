import React from 'react';
import { useSetTitle } from 'store/page-title';

function Tweets({ user }) {
  useSetTitle(user.name, `@${user.twitterHandle}`);

  return (
    <div>
      <h1>hello from tweets</h1>
    </div>
  );
}

export default Tweets;
