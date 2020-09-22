import React from 'react';
import { connect } from 'react-redux';
import { updateHeader } from 'actions/update-header';
import { useSetTitle } from 'hooks/set-title';

function Home({ updateHeader }) {
  useSetTitle({
    title: 'Home',
    description: null,
    func: updateHeader,
  });

  return <div></div>;
}

function mapDispatchToProps(dispatch) {
  return {
    updateHeader: (payload) => dispatch(updateHeader(payload)),
  };
}

export default connect(null, mapDispatchToProps)(Home);
