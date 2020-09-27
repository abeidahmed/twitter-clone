import { useState } from 'react';

export function useDisplayUploadedImage() {
  const [imageSrc, setImageSrc] = useState('');

  function onUpload(e) {
    const imageFile = e.target.files[0];

    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      setImageSrc(e.target.result);
    });

    reader.readAsDataURL(imageFile);
  }

  const clearImage = () => setImageSrc('');

  return { imageSrc, onUpload, clearImage };
}
