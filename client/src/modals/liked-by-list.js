import React from 'react';
import { useQuery } from 'react-query';
import { useModalType } from 'store/modal';
import * as q from 'shared/query-key';
import { likedBy } from 'api/liked-by';
import { ModalWrapper } from 'components/modal-wrapper';
import UserCard from 'components/user-card';
import { Spinner } from 'components/spinner';
import ObjectNotFound from 'shared/not-found/object-not-found';

function LikedByList() {
  const { modalProps } = useModalType();
  const { data, isLoading, isError } = useQuery(
    [q.ALL_TWEET_LIKERS, { id: modalProps.id }],
    likedBy
  );

  return (
    <ModalWrapper modalTitle="Liked by">
      <div className="relative">
        {isLoading || isError ? <Spinner /> : <ListResult data={data} />}
      </div>
    </ModalWrapper>
  );
}

function ListResult({ data }) {
  const {
    data: { users },
  } = data;

  return (
    <>
      {users.length ? (
        users.map((user) => <UserCard user={user} />)
      ) : (
        <ObjectNotFound
          description="We're sorry, no one has liked the tweet. People who has liked the
        tweet will show up here."
        />
      )}
    </>
  );
}

export default LikedByList;
