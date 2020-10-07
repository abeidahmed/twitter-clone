import React from 'react';
import PropTypes from 'prop-types';
import { useCurrentUser } from 'store/currentUser';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import { follow } from 'api/follow';
import { unfollow } from 'api/unfollow';
import * as q from 'shared/queryKey';
import { useModalType } from 'store/modal';
import { Button, FollowButton } from 'components/Button';

function DynamicFollowBtn({ user }) {
  const { currentUser } = useCurrentUser();
  const {
    id,
    includes: {
      followStat: { isFollowing },
    },
  } = user;

  const [
    followMutate,
    { isLoading: followLoading },
  ] = useRefetchMutation(follow, [q.SHOW_USER]);

  async function handleFollow() {
    await followMutate({
      id,
    });
  }

  const [
    unfollowMutate,
    { isLoading: unfollowLoading },
  ] = useRefetchMutation(unfollow, [q.SHOW_USER]);

  async function handleUnfollow() {
    await unfollowMutate({
      id,
    });
  }

  const { modalOn, types } = useModalType();

  function openModal(currentUser) {
    modalOn({
      modalType: types.EDIT_PROFILE,
      modalProps: {
        id: currentUser.id,
        name: currentUser.name,
        bio: currentUser.bio,
        location: currentUser.location,
        website: currentUser.website,
        avatar: currentUser.avatar,
        banner: currentUser.banner,
      },
    });
  }

  if (id === currentUser.id) {
    return (
      <Button
        size="md"
        appearance="minimal"
        onClick={() => openModal(currentUser)}
      >
        Edit profile
      </Button>
    );
  }
  return (
    <FollowButton
      isFollowing={isFollowing}
      onFollow={() => handleFollow()}
      onUnfollow={() => handleUnfollow()}
      followLoading={followLoading}
      unfollowLoading={unfollowLoading}
      size="md"
    />
  );
}

DynamicFollowBtn.propTypes = {
  user: PropTypes.object,
};

export default DynamicFollowBtn;
