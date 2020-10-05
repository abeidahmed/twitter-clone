import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage } from './components';

function Input({ label, id, to, error, errorType, ...props }) {
  let pathname, title;
  if (to) {
    pathname = to.pathname;
    title = to.title;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {to && (
          <Link
            to={pathname}
            className="text-sm font-medium text-blue-600 transition duration-150 ease-in-out hover:text-blue-500"
          >
            {title}
          </Link>
        )}
      </div>
      <input
        id={id}
        className="block w-full mt-1 shadow-sm form-input"
        {...props}
      />
      <ErrorMessage error={error} errorType={errorType} />
    </div>
  );
}

export default Input;
