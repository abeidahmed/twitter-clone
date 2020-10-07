import React from 'react';
import { useModalType } from 'store/modal';
import * as modal from './types';
import CreateCommentOnComment from './create-comment-on-comment';
import CreateCommentOnTweet from './create-comment-on-tweet';
import CreateTweet from './create-tweet';
import { EditProfile } from './EditProfile';
import { LikedByList } from './LikedByList';

const MODAL_COMPONENTS = {
  [modal.CREATE_COMMENT_ON_COMMENT]: CreateCommentOnComment,
  [modal.CREATE_COMMENT_ON_TWEET]: CreateCommentOnTweet,
  [modal.CREATE_TWEET]: CreateTweet,
  [modal.EDIT_PROFILE]: EditProfile,
  [modal.LIKED_BY_LIST]: LikedByList,
};

function ModalRoot() {
  const { modalType, modalProps } = useModalType();

  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />;
}

export default ModalRoot;
