import React from 'react';
import cn from 'classnames';

function Spinner({ position = 'top' }) {
  const spinnerClass = cn([
    'absolute transform -translate-x-1/2 lds-dual-ring top-10 left-1/2',
    {
      'top-10': position === 'top',
      'top-1/2 -translate-y-1/2': position === 'center',
    },
  ]);

  return <div className={spinnerClass}></div>;
}

export default Spinner;
