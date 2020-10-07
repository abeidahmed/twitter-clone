import React from 'react';
import { useQuery } from 'react-query';
import { useModalType } from 'store/modal';
import * as q from 'shared/queryKey';
import { likedBy } from 'api/liked-by';
import { ModalWrapper } from '../ModalWrapper';
import { Spinner } from 'components/Loader';
import { DisplayList } from './components';

function LikedByList() {
  const { modalProps } = useModalType();
  const { data: { data: { users } = {} } = {}, isLoading, isError } = useQuery(
    [q.ALL_TWEET_LIKERS, { id: modalProps.id }],
    likedBy
  );

  return (
    <ModalWrapper modalTitle="Liked by">
      <div className="relative">
        {isLoading || isError ? <Spinner /> : <DisplayList users={users} />}
      </div>
    </ModalWrapper>
  );
}

export default LikedByList;
