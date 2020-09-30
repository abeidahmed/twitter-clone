import React from 'react';
import { useCurrentUser } from 'store/current-user';
import { IconButton, Button } from './button';
import { Icon } from './icon';
import { FileUpload } from './file-upload';
import { CharTracker } from './char-tracker';
import * as limit from 'shared/char-limit';
import { Avatar } from './avatar';

export function TwitterTextarea({
  rows,
  handleSubmit,
  textareaRef,
  eleHeight,
  body,
  setBody,
  imageSrc,
  imageRef,
  setImage,
  clearImage,
  onUpload,
  isLoading,
  placeholder,
  buttonLabel,
  canUploadImage,
}) {
  const { currentUser } = useCurrentUser();

  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <Avatar size="lg" src={currentUser.avatar} alt={currentUser.name} />
      </div>
      <div className="flex-1 ml-3">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="tweet-main-textarea" className="sr-only">
            Create text
          </label>
          <textarea
            ref={textareaRef}
            rows={rows}
            id="tweet-main-textarea"
            placeholder={placeholder}
            className="block w-full h-auto p-0 pt-2 text-lg border-none resize-none focus:shadow-none form-textarea"
            style={{ height: eleHeight }}
            value={body}
            onChange={setBody}
          />
          {canUploadImage && imageSrc && (
            <div className="relative">
              <img
                ref={imageRef}
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
                  color="primary"
                >
                  <Icon icon="x" className="w-5 h-5" />
                </IconButton>
              </div>
            </div>
          )}
          <hr className="my-2 border-gray-200" />
          <div className="flex items-center justify-between">
            <div className="flex items-center -ml-2">
              {canUploadImage && (
                <FileUpload
                  icon="photograph"
                  size="md"
                  color="white"
                  name="image"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    onUpload(e);
                    e.target.value = null;
                  }}
                />
              )}
              <IconButton size="md" color="primary-text">
                <Icon icon="smiley" className="w-6 h-6" />
              </IconButton>
              <IconButton size="md" color="primary-text">
                <Icon icon="calendar" className="w-6 h-6" />
              </IconButton>
            </div>
            <div className="flex items-center space-x-3">
              <CharTracker
                size="md"
                current={body.length}
                limit={limit.TWEET_BODY_CHAR}
              />
              <Button
                disabled={isLoading || !body.length}
                color="primary"
                size="md"
              >
                {buttonLabel}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
