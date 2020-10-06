import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/Icon';

function Header() {
  return (
    <div className="px-4">
      <Icon
        icon="twitter-solid"
        stroke="none"
        fill="currentColor"
        className="w-12 h-12 mx-auto text-blue-500"
      />
      <h2 className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900">
        See what's happening in the world right now
      </h2>
      <p className="mt-2 text-sm leading-5 text-center text-gray-600">
        Already have an account?{' '}
        <Link
          to="/secure/login"
          className="font-medium text-blue-600 transition duration-150 ease-in-out hover:text-blue-500"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Header;
