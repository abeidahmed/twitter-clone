import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components/Icon';

function SadFaceNotFound({ description }) {
  return (
    <section className="p-4">
      <div className="w-full max-w-md mx-auto">
        <Icon icon="emoji-sad" className="w-10 h-10 mx-auto text-gray-300" />
        <h2 className="mt-4 text-center text-gray-700">{description}</h2>
      </div>
    </section>
  );
}

SadFaceNotFound.propTypes = {
  description: PropTypes.string,
};

export default SadFaceNotFound;
