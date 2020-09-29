import React from 'react';
import cn from 'classnames';
import { useModalType } from 'store/modal';
import { Icon } from 'components/icon';
import { Button, IconButton } from './button';
import { OutsideClickHandler } from './outside-click-handler';

export function ModalWrapper({
  modalPosition,
  spacingX,
  spacingY,
  spacing,
  button,
  modalTitle,
  children,
}) {
  const { modalOff } = useModalType();

  const wrapperClass = cn([
    'fixed inset-0 z-50 flex items-center justify-center px-4 py-8',
    {
      'md:items-start': modalPosition === 'top',
    },
  ]);

  const sectionClass = cn([
    'overflow-y-auto',
    {
      'px-4': spacingX === 'md',
      'py-10': spacingY === 'lg',
      'py-10 px-4': spacing === 'lg',
    },
  ]);

  return (
    <div className={wrapperClass}>
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
      <OutsideClickHandler
        onOutsideClick={() => modalOff()}
        className="w-full max-w-xl overflow-hidden transition-all transform bg-white rounded-lg shadow-xl"
      >
        <Header modalTitle={modalTitle} button={button} />
        <section
          className={sectionClass}
          style={{ maxHeight: 600, minHeight: 120 }}
        >
          {children}
        </section>
      </OutsideClickHandler>
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
