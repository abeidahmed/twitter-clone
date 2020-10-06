import React from 'react';
import { Link } from 'react-router-dom';

function Terms() {
  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600">
        By signing in you agree to our{' '}
        <Link
          to="/"
          className="font-medium underline transition duration-150 ease-in-out hover:text-gray-500"
        >
          terms and conditions
        </Link>
        .
      </p>
    </div>
  );
}

export default Terms;
