import React from 'react';
import cn from 'classnames';
import { useCurrentUser } from 'store/currentUser';
import { useDisplayUploadedImage } from 'hooks/useDisplayUploadedImage';
import * as limit from 'shared/charLimit';
import { IconButton, Button } from 'components/Button';
import { Icon } from 'components/Icon';
import { ResizableTextarea } from 'components/Field';
import { CharTracker } from 'components/CharTracker';
import { Avatar } from 'components/Avatar';
import { DisplayImage, UploadButton } from './components';

function TwitterBox({
  rows,
  canUploadImage,
  placeholder,
  buttonLabel,
  handleSubmit,
  body,
  setBody,
  setImage,
  isLoading,
  noPadding,
}) {
  const wrapperClass = cn([
    'py-2',
    {
      'px-0': noPadding,
      'px-4': !noPadding,
    },
  ]);

  const {
    currentUser: { avatar, name },
  } = useCurrentUser();
  const { imageSrc, onUpload, clearImage } = useDisplayUploadedImage();

  const makeSubmission = async (e) => {
    e.preventDefault();
    await handleSubmit();
    clearImage();
  };

  return (
    <div className={wrapperClass}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Avatar size="lg" src={avatar} alt={name} />
        </div>
        <div className="flex-1 ml-3">
          <form className="flex flex-col">
            <ResizableTextarea
              rows={rows}
              value={body}
              onChange={(e) => {
                const text = e.target.value;
                if (text.length > limit.TWEET_BODY_CHAR) return;
                setBody(text);
              }}
              placeholder={placeholder}
            />
            <DisplayImage
              canUploadImage={canUploadImage}
              imageSrc={imageSrc}
              setImage={setImage}
              clearImage={clearImage}
            />
            <hr className="my-2 border-gray-200" />
            <div className="flex items-center justify-between">
              <div className="flex items-center -ml-2">
                <UploadButton
                  canUploadImage={canUploadImage}
                  setImage={setImage}
                  onUpload={onUpload}
                />
                <IconButton size="md" appearance="minimal">
                  <Icon icon="smiley" className="w-6 h-6" />
                </IconButton>
                <IconButton size="md" appearance="minimal">
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
                  appearance="primary"
                  size="md"
                  onClick={makeSubmission}
                >
                  {buttonLabel}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TwitterBox;
