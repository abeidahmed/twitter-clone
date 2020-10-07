import React from 'react';
import cn from 'classnames';

function Aside({ isActive, children }) {
  const overlayClass = cn([
    'fixed inset-0 z-50 lg:hidden',
    {
      block: isActive,
      hidden: !isActive,
    },
  ]);

  const asideClass = cn([
    'fixed top-0 z-50 flex flex-col flex-shrink-0 w-64 h-screen transition duration-150 ease-in-out transform bg-white',
    {
      'translate-x-0': isActive,
      '-translate-x-full': !isActive,
    },
  ]);

  return (
    <>
      <div className={overlayClass}>
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <aside className={asideClass}>{children}</aside>
    </>
  );
}

export default Aside;
