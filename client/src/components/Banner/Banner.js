import React from 'react';
import PropTypes from 'prop-types';

function Banner({ src, alt }) {
  return (
    <div className="h-48 bg-gray-300">
      {src && (
        <img
          className="flex-shrink-0 object-cover w-full h-48"
          src={src}
          alt={alt}
        />
      )}
    </div>
  );
}

Banner.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Banner;
