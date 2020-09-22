import React from 'react';
import { connect } from 'react-redux';
import { openSidebar } from 'actions/sidebar';

function Header({ openSidebar, title, description }) {
  return (
    <header className="sticky top-0 flex-shrink-0 border border-gray-200">
      <div className="flex items-center px-4 h-14">
        <button
          onClick={openSidebar}
          className="rounded-full sm:hidden focus:outline-none focus:shadow-outline-blue"
        >
          <img
            className="flex-shrink-0 w-8 h-8 rounded-full"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
            alt=""
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

function mapStateToProps(state) {
  const { title, description } = state.header;
  return {
    title,
    description,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openSidebar: () => dispatch(openSidebar()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
