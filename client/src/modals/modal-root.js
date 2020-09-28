import React from 'react';
import { useModalType } from 'store/modal';
import CreateTweet from './create-tweet';
import EditProfile from './edit-profile';

const MODAL_COMPONENTS = {
  CREATE_TWEET: CreateTweet,
  EDIT_PROFILE: EditProfile,
};

function ModalRoot() {
  const { modalType, modalProps } = useModalType();

  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />;
}

export default ModalRoot;
