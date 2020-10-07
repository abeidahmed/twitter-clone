import React from 'react';
import { File } from 'components/Field';

function UploadButton({ canUploadImage, setImage, onUpload }) {
  if (canUploadImage) {
    return (
      <File
        icon="photograph"
        size="md"
        appearance="minimal"
        name="image"
        onChange={(e) => {
          setImage(e.target.files[0]);
          onUpload(e);
          e.target.value = null;
        }}
      />
    );
  }
  return null;
}

export default UploadButton;
