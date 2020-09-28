import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useSetTitle } from 'store/page-title';
import { useDebounce } from 'hooks/debounce';
import * as q from 'shared/query-key';
import { allUsers } from 'api/all-users';
import UserCard from 'components/user-card';
import { Spinner } from 'components/spinner';
import { SearchBar } from 'components/search-bar';

function Explore() {
  useSetTitle('Explore', null);

  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm);
  const { data, isLoading, isError } = useQuery(
    [q.ALL_USERS, { q: debouncedSearchTerm }],
    allUsers
  );

  return (
    <main className="py-3">
      <div className="px-4 pb-6 mt-3 border-b border-gray-200">
        <SearchBar
          placeholder="Explore people"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="relative">
        {isLoading || isError ? (
          <Spinner />
        ) : (
          <section className="w-full">
            {data.data.users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default Explore;
