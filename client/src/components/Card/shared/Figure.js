import React from 'react';
import { AspectRatio } from 'components/AspectRatio';

function Figure({ image }) {
  if (image) {
    return (
      <figure className="mt-3">
        <AspectRatio src={image} alt="attachment" ratio="16:9" />
      </figure>
    );
  }
  return null;
}

export default Figure;
