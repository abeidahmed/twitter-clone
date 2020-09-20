import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/icon';

export default function Signup() {
  return (
    <main className="flex justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full sm:max-w-md">
        <div className="px-4">
          <Icon
            icon="twitter-solid"
            className="w-12 h-12 text-blue-500 mx-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900">
            See what's happening in the world right now
          </h2>
          <p className="mt-2 text-sm leading-5 text-center text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 transition duration-150 ease-in-out hover:text-blue-500"
            >
              Login
            </Link>
          </p>
        </div>
        <div className="px-10 py-8 mt-8 bg-white shadow sm:rounded-md">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                className="block w-full mt-1 shadow-sm form-input"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                required
                className="block w-full mt-1 shadow-sm form-input"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 transition duration-150 ease-in-out hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                required
                className="block w-full mt-1 shadow-sm form-input"
              />
            </div>
            <div>
              <span className="rounded-md shadow-sm">
                <button
                  type="submit"
                  className="block w-full px-3 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
                >
                  Sign up
                </button>
              </span>
            </div>
          </form>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              By signing in you agree to our{' '}
              <a
                href="#"
                className="font-medium underline transition duration-150 ease-in-out hover:text-gray-500"
              >
                terms and conditions
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
