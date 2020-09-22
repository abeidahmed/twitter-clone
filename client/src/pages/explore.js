import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from 'react-query';
import { Icon } from 'components/icon';
import { UserCard } from 'components/user-card';
import { allUsers } from 'api/all-users';
import { updateHeader } from 'actions/update-header';
import { useSetTitle } from 'hooks/set-title';

function Explore({ updateHeader }) {
  useSetTitle({
    title: 'Explore',
    description: null,
    func: updateHeader,
  });

  const { data, isLoading, isError } = useQuery('allUsers', allUsers);

  if (isLoading || isError) return null;

  return (
    <main className="py-3">
      <div className="relative flex items-center px-4 pt-3 pb-6 text-gray-400 focus-within:text-blue-500">
        <input
          type="text"
          placeholder="Explore people"
          className="block w-full py-2 pl-10 pr-3 text-gray-900 transition duration-150 ease-in-out bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:bg-white focus:border-blue-500 focus:shadow"
        />
        <div className="absolute left-0 pl-7">
          <Icon icon="search" className="w-5 h-5" />
        </div>
      </div>
      <section className="w-full">
        {data.data.users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </section>
    </main>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    updateHeader: (payload) => dispatch(updateHeader(payload)),
  };
}

export default connect(null, mapDispatchToProps)(Explore);
