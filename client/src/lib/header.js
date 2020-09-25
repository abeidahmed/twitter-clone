import React, { useContext } from 'react';
import { PageTitleContext } from 'store/page-title';
import { useSidebarToggle } from 'store/sidebar';
import { useCurrentUser } from 'store/current-user';

function Header() {
  const [{ title, description }] = useContext(PageTitleContext);
  const { setOn } = useSidebarToggle();

  const { user } = useCurrentUser();

  return (
    <header className="sticky top-0 flex-shrink-0 border border-gray-200">
      <div className="flex items-center px-4 h-14">
        <button
          onClick={setOn}
          className="rounded-full sm:hidden focus:outline-none focus:shadow-outline-blue"
        >
          <img
            className="flex-shrink-0 w-8 h-8 rounded-full"
            src={user.avatar}
            alt={`${user.twitterHandle}'s profile`}
          />
        </button>
        <div className="px-4 sm:px-0">
          <h1 className="text-lg font-extrabold leading-6">{title}</h1>
          {description && (
            <p className="text-xs leading-5 text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
