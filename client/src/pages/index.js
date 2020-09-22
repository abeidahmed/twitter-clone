import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateHeader } from 'actions/update-header';

function Home({ updateHeader }) {
  const meta = {
    title: 'Home',
    description: null,
  };

  useEffect(() => {
    updateHeader(meta);
  }, [meta]);

  return <div></div>;
}

function mapDispatchToProps(dispatch) {
  return {
    updateHeader: (payload) => dispatch(updateHeader(payload)),
  };
}

export default connect(null, mapDispatchToProps)(Home);
