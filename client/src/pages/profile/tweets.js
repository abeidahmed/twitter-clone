import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateHeader } from 'actions/update-header';

function Tweets({ updateHeader }) {
  const meta = {
    title: 'Abeid Ahmed',
    description: '@iamhawaabi',
  };

  useEffect(() => {
    updateHeader(meta);
  }, [meta]);

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
