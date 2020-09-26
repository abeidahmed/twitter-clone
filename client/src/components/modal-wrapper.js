import React from 'react';
import { useModalType } from 'store/modal';
import { Icon } from 'components/icon';
import { Button, IconButton } from './button';

export function ModalWrapper({ button, modalTitle, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-xl sm:w-full">
        <Header modalTitle={modalTitle} button={button} />
        <section
          className="px-4 py-10 overflow-y-auto"
          style={{ maxHeight: 600 }}
        >
          {children}
        </section>
      </div>
    </div>
  );
}

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
          color="primary-text"
          onClick={modalOff}
          position="left"
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
          color="primary"
          onClick={onSubmit}
          disabled={disabled}
        >
          {title}
        </Button>
      )}
    </header>
  );
}
