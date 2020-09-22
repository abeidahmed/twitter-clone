import React from 'react';
import { connect } from 'react-redux';
import { updateHeader } from 'actions/update-header';
import { useSetTitle } from 'hooks/set-title';

function Tweets({ user, updateHeader }) {
  useSetTitle({
    title: user.name,
    description: `@${user.twitterHandle}`,
    func: updateHeader,
  });

  return (
    <div>
      <h1>hello from tweets</h1>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    updateHeader: (payload) => dispatch(updateHeader(payload)),
  };
}

export default connect(null, mapDispatchToProps)(Tweets);
