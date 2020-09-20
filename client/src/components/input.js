import React from 'react';
import { Link } from 'react-router-dom';
import { fieldValidation } from 'utils/helpers';

export function Input({ label, id, extraLink, error, errorType, ...props }) {
  let to, name;
  if (extraLink) {
    to = extraLink.to;
    name = extraLink.name;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {extraLink && (
          <Link
            to={to}
            className="text-sm font-medium text-blue-600 transition duration-150 ease-in-out hover:text-blue-500"
          >
            {name}
          </Link>
        )}
      </div>
      <input
        id={id}
        className="block w-full mt-1 shadow-sm form-input"
        {...props}
      />
      {fieldValidation(error, errorType) && (
        <p className="mt-1 text-sm font-medium text-red-700">
          {fieldValidation(error, errorType)}
        </p>
      )}
    </div>
  );
}
