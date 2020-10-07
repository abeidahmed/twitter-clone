import React from 'react';
import cn from 'classnames';
import { useModalType } from 'store/modal';
import { OutsideClickHandler } from 'components/Container';
import { Header } from './components';

function ModalWrapper({
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

export default ModalWrapper;
