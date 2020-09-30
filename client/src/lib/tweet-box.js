import React, { useState, useRef } from 'react';
import { useCharTrackerState } from 'hooks/char-tracker';
import { useCalHeight } from 'hooks/calc-height';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { useDisplayUploadedImage } from 'hooks/display-uploaded-image';
import * as limit from 'shared/char-limit';
import * as q from 'shared/query-key';
import { createTweet } from 'api/create-tweet';
import { TwitterTextarea } from 'components/twitter-textarea';

function TweetBox({ rows }) {
  const [body, setBody, clearBody] = useCharTrackerState(
    '',
    limit.TWEET_BODY_CHAR
  );
  const [image, setImage] = useState('');
  const [replyStatus] = useState('everyone');

  const textareaRef = useRef(null);
  const imageRef = useRef(null);

  const { eleHeight } = useCalHeight(body, 'auto', textareaRef);

  const { imageSrc, onUpload, clearImage } = useDisplayUploadedImage();

  const [mutate, { isLoading }] = useRefetchMutation(createTweet, [
    q.ALL_TWEETS,
    q.SHOW_USER,
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
    await mutate({
      body,
      image,
      replyStatus,
    });
    clearBody();
    setImage('');
    clearImage();
  }

  return (
    <div className="px-4 py-2">
      <TwitterTextarea
        rows={rows}
        canUploadImage={true}
        handleSubmit={handleSubmit}
        textareaRef={textareaRef}
        eleHeight={eleHeight}
        body={body}
        setBody={setBody}
        imageSrc={imageSrc}
        imageRef={imageRef}
        setImage={setImage}
        clearImage={clearImage}
        onUpload={onUpload}
        isLoading={isLoading}
        placeholder="What's happening?"
        buttonLabel="Tweet"
      />
    </div>
  );
}

export default TweetBox;
