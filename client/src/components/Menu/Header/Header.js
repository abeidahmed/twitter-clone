import React, { useContext } from 'react';
import { PageTitleContext } from 'store/page-title';
import { useSidebarToggle } from 'store/sidebar';
import { useCurrentUser } from 'store/current-user';
import { Avatar } from 'components/Avatar';

function Header() {
  const [{ title, description }] = useContext(PageTitleContext);
  const { setOn } = useSidebarToggle();

  const {
    currentUser: { avatar, twitterHandle },
  } = useCurrentUser();

  return (
    <header className="sticky top-0 z-10 flex-shrink-0 bg-white border border-gray-200">
      <div className="flex items-center px-4 h-14">
        <button
          onClick={setOn}
          className="rounded-full sm:hidden focus:outline-none focus:shadow-outline-blue"
        >
          <Avatar size="sm" src={avatar} alt={`${twitterHandle}'s profile`} />
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
