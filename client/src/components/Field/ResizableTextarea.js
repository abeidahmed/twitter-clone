import React, { useRef } from 'react';
import { useResizer } from './utils';

function ResizableTextarea({ value, ...props }) {
  const textareaRef = useRef();
  const { eleHeight } = useResizer(value, 'auto', textareaRef);

  return (
    <div>
      <label htmlFor="tweet-main-textarea" className="sr-only">
        Create tweet
      </label>
      <textarea
        id="tweet-main-textarea"
        className="block w-full h-auto p-0 pt-2 overflow-hidden text-lg border-none resize-none focus:shadow-none form-textarea"
        {...props}
        value={value}
        ref={textareaRef}
        style={{ height: eleHeight }}
      />
    </div>
  );
}

export default ResizableTextarea;
