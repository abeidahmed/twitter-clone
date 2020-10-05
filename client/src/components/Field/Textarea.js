import React from 'react';
import cn from 'classnames';
import { ErrorMessage } from './components';

function Textarea({ id, label, error, errorType, resize, ...props }) {
  const textareaClass = cn([
    'block w-full mt-1 shadow-sm form-textarea',
    {
      'resize-none': !resize,
    },
  ]);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea id={id} {...props} className={textareaClass} />
      <ErrorMessage error={error} errorType={errorType} />
    </div>
  );
}

export default Textarea;
