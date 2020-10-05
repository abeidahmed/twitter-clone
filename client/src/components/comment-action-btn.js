import React, { useState } from 'react';
import { useModalType } from 'store/modal';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { voteComment } from 'api/vote-comment';
import { bookmarkComment } from 'api/create-bookmark';
import { deleteBookmark } from 'api/delete-bookmark';
import * as q from 'shared/query-key';
import { CommentButton } from './comment-button';
import { LikeButton } from './like-button';
import { TwitterActionButton, MenuButton } from './Button';
import { DropdownContainer, OutsideClickHandler } from './Container';

export function CommentActionBtn({ comment }) {
  const { meta, id } = comment;
  const { likes } = meta;

  return (
    <>
      <CommentBtn comment={comment} />
      <RetweetBtn />
      <LikeBtn likes={likes} commentID={id} />
      <ShareBtn comment={comment} />
    </>
  );
}

function CommentBtn({ comment }) {
  const { body, commenter, createdAt, id, meta } = comment;
  const { name, twitterHandle, avatar } = commenter;
  const {
    comments: { totalComments },
  } = meta;

  const { modalOn, types } = useModalType();

  function handleComment() {
    modalOn({
      modalType: types.CREATE_COMMENT_ON_COMMENT,
      modalProps: {
        commentID: id,
        commenterName: name,
        commenterTwitterHandle: twitterHandle,
        commenterAvatar: avatar,
        commentBody: body,
        commentCreatedAt: createdAt,
      },
    });
  }

  return (
    <CommentButton
      size="sm"
      showCount={true}
      count={totalComments}
      onClick={handleComment}
    />
  );
}

function LikeBtn({ likes, commentID }) {
  const [mutate, { isLoading }] = useRefetchMutation(voteComment, [
    q.SHOW_TWEET,
  ]);

  async function handleLike() {
    await mutate({
      id: commentID,
    });
  }

  return (
    <LikeButton
      size="sm"
      showCount={true}
      status={likes}
      disabled={isLoading}
      onClick={handleLike}
    />
  );
}

function RetweetBtn() {
  return (
    <TwitterActionButton
      icon="refresh"
      size="sm"
      appearance="green"
      className="relative"
    >
      4
    </TwitterActionButton>
  );
}

function ShareBtn({ comment }) {
  const { meta, id } = comment;
  const { isBookmarked } = meta;
  const [isActive, setIsActive] = useState(false);

  const [
    addBookmark,
    { isLoading: adding },
  ] = useRefetchMutation(bookmarkComment, [
    q.SHOW_TWEET,
    q.USER_COMMENTED_TWEETS,
  ]);

  const [
    removeBookmark,
    { isLoading: removing },
  ] = useRefetchMutation(deleteBookmark, [
    q.ALL_BOOKMARKS,
    q.SHOW_TWEET,
    q.USER_COMMENTED_TWEETS,
  ]);

  async function handleAddBookmark() {
    await addBookmark({
      commentID: id,
    });
  }

  async function handleRemoveBookmark() {
    await removeBookmark({
      id,
    });
  }

  const links = [
    {
      title: isBookmarked ? 'Remove from bookmarks' : 'Add tweet to bookmarks',
      icon: 'bookmark',
      onClick: isBookmarked
        ? () => handleRemoveBookmark()
        : () => handleAddBookmark(),
      disabled: isBookmarked ? removing : adding,
    },
    {
      title: 'Copy link to tweet',
      icon: 'link',
    },
  ];

  return (
    <OutsideClickHandler
      onOutsideClick={() => setIsActive(false)}
      className="relative flex items-center justify-center"
    >
      <TwitterActionButton
        icon="upload"
        size="sm"
        appearance="teal"
        className="relative"
        onClick={() => setIsActive(!isActive)}
      />
      <DropdownContainer isActive={isActive}>
        {links.map((link) => (
          <MenuButton
            key={link.title}
            size="md"
            icon={link.icon}
            variant="menu"
            onClick={link.onClick ? link.onClick : null}
            disabled={link.disabled && link.disabled}
          >
            {link.title}
          </MenuButton>
        ))}
      </DropdownContainer>
    </OutsideClickHandler>
  );
}
