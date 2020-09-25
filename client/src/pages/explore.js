import React from 'react';
import { useQuery } from 'react-query';
import { useSetTitle } from 'store/page-title';
import UserCard from 'components/user-card';
import { allUsers } from 'api/all-users';
import { Spinner } from 'components/spinner';
import { SearchBar } from 'components/search-bar';

function Explore() {
  useSetTitle('Explore', null);

  const { data, isLoading, isError } = useQuery('allUsers', allUsers);

  if (isLoading || isError) return <Spinner />;

  return (
    <main className="py-3">
      <div className="px-4 mt-3 mb-6">
        <SearchBar placeholder="Explore people" />
      </div>
      <section className="w-full">
        {data.data.users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </section>
    </main>
  );
}

export default Explore;
