import React from 'react';
import { useSetTitle } from 'store/page-title';

function Home() {
  useSetTitle('Home', null);

  return <div></div>;
}

export default Home;
