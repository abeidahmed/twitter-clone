import React from 'react';
import cn from 'classnames';
import { fieldValidation } from 'utils/helpers';

export function Textarea({ id, label, error, errorType, resize, ...props }) {
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
      {fieldValidation(error, errorType) && (
        <p className="mt-1 text-sm font-medium text-red-700">
          {fieldValidation(error, errorType)}
        </p>
      )}
    </div>
  );
}
