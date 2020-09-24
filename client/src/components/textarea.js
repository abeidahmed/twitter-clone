import React from 'react';
import { fieldValidation } from 'utils/helpers';

export function Textarea({ id, label, error, errorType, resize, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        className={`${
          !resize && 'resize-none'
        } block w-full mt-1 shadow-sm form-textarea`}
      />
      {fieldValidation(error, errorType) && (
        <p className="mt-1 text-sm font-medium text-red-700">
          {fieldValidation(error, errorType)}
        </p>
      )}
    </div>
  );
}
