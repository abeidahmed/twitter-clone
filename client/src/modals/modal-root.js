import React from 'react';
import { useModalType } from 'store/modal';
import * as modal from 'shared/modal-type';
import CreateTweet from './create-tweet';
import EditProfile from './edit-profile';

const MODAL_COMPONENTS = {
  [modal.CREATE_TWEET]: CreateTweet,
  [modal.EDIT_PROFILE]: EditProfile,
};

function ModalRoot() {
  const { modalType, modalProps } = useModalType();

  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />;
}

export default ModalRoot;
