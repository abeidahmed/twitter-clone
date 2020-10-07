import React from 'react';
import PropTypes from 'prop-types';
import { Textarea } from 'components/Field';
import { CharTracker } from 'components/CharTracker';

function TextareaWithCharTracker({
  charLength,
  charLimit,
  size = 'sm',
  rows = 4,
  resize = false,
  autoComplete = 'off',
  ...props
}) {
  return (
    <div>
      <Textarea
        autoComplete={autoComplete}
        {...props}
        rows={rows}
        resize={resize}
      />
      <CharTracker
        size={size}
        current={charLength}
        limit={charLimit}
        className="mt-1 text-right"
      />
    </div>
  );
}

TextareaWithCharTracker.propTypes = {
  charLength: PropTypes.number,
  charLimit: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md']),
  rows: PropTypes.number,
  resize: PropTypes.bool,
  autoComplete: PropTypes.oneOf(['on', 'off']),
};

export default TextareaWithCharTracker;
