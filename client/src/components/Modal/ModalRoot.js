import React from 'react';
import ReactDOM from 'react-dom';
import { useModalType } from 'store/modal';
import * as modal from './types';
import { CreateCommentOnComment, CreateCommentOnTweet } from './Comment';
import { CreateTweet } from './CreateTweet';
import { CreateTweetRetweet, CreateRetweetRetweet } from './Retweet';
import { EditProfile } from './EditProfile';
import { LikedByList } from './LikedByList';

const MODAL_COMPONENTS = {
  [modal.CREATE_COMMENT_ON_COMMENT]: CreateCommentOnComment,
  [modal.CREATE_COMMENT_ON_TWEET]: CreateCommentOnTweet,
  [modal.CREATE_TWEET]: CreateTweet,
  [modal.CREATE_TWEET_RETWEET]: CreateTweetRetweet,
  [modal.CREATE_RETWEET_RETWEET]: CreateRetweetRetweet,
  [modal.EDIT_PROFILE]: EditProfile,
  [modal.LIKED_BY_LIST]: LikedByList,
};

function ModalRoot() {
  const { modalType, modalProps } = useModalType();

  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return ReactDOM.createPortal(
    <SpecificModal {...modalProps} />,
    document.getElementById('portal')
  );
}

export default ModalRoot;
