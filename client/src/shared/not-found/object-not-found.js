import React from 'react';
import { Icon } from 'components/Icon';

function ObjectNotFound({ description }) {
  return (
    <section className="p-4">
      <div className="w-full max-w-md mx-auto">
        <Icon icon="emoji-sad" className="w-10 h-10 mx-auto text-gray-300" />
        <h2 className="mt-4 text-center text-gray-700">{description}</h2>
      </div>
    </section>
  );
}

export default ObjectNotFound;
