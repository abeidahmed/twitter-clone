import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'components/Field';
import { CharTracker } from 'components/CharTracker';

function InputWithCharTracker({
  charLength,
  charLimit,
  size = 'sm',
  autoComplete = 'off',
  ...props
}) {
  return (
    <div>
      <Input autoComplete={autoComplete} {...props} />
      <CharTracker
        size={size}
        current={charLength}
        limit={charLimit}
        className="mt-1 text-right"
      />
    </div>
  );
}

InputWithCharTracker.propTypes = {
  charLength: PropTypes.number,
  charLimit: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md']),
  autoComplete: PropTypes.oneOf(['on', 'off']),
};

export default InputWithCharTracker;
