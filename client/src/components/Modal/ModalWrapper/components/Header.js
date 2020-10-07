import React from 'react';
import PropTypes from 'prop-types';
import { useModalType } from 'store/modal';
import { IconButton, Button } from 'components/Button';
import { Icon } from 'components/Icon';

function Header({ modalTitle, button }) {
  const { modalOff } = useModalType();

  let title, onSubmit, disabled;
  if (button) {
    title = button.title;
    onSubmit = button.onSubmit;
    disabled = button.disabled;
  }

  return (
    <header className="flex items-center justify-between px-4 border-b border-gray-200 h-14">
      <div className="flex items-center">
        <IconButton
          size="md"
          appearance="minimal"
          onClick={modalOff}
          className="-ml-2"
        >
          <Icon icon="x" className="w-6 h-6" />
        </IconButton>
        <div className="ml-5">
          <h2 className="text-lg font-bold">{modalTitle}</h2>
        </div>
      </div>
      {button && (
        <Button
          size="sm"
          appearance="primary"
          onClick={onSubmit}
          disabled={disabled}
        >
          {title}
        </Button>
      )}
    </header>
  );
}

Header.propTypes = {
  modalTitle: PropTypes.string,
  button: PropTypes.exact({
    title: PropTypes.string,
    onSubmit: PropTypes.func,
    disabled: PropTypes.bool,
  }),
};

export default Header;
