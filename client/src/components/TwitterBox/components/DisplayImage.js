import React from 'react';
import { IconButton } from 'components/Button';
import { Icon } from 'components/Icon';

function DisplayImage({ canUploadImage, imageSrc, setImage, clearImage }) {
  if (canUploadImage && imageSrc) {
    return (
      <div className="relative">
        <img
          className="object-cover w-full h-56 rounded-lg"
          src={imageSrc}
          alt="Uploaded"
        />
        <div className="absolute top-0 left-0 p-2">
          <IconButton
            onClick={() => {
              setImage('');
              clearImage();
            }}
            size="sm"
            appearance="primary"
          >
            <Icon icon="x" className="w-5 h-5" />
          </IconButton>
        </div>
      </div>
    );
  }
  return null;
}

export default DisplayImage;
