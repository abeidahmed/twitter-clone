import React, { useState, useRef } from 'react';
import { useMutation, queryCache } from 'react-query';
import { useCurrentUser } from 'store/current-user';
import { useCharTrackerState } from 'hooks/char-tracker';
import { useCalHeight } from 'hooks/calc-height';
import * as limit from 'shared/char-limit';
import { createTweet } from 'api/create-tweet';
import { Avatar } from 'components/avatar';
import { IconButton, Button } from 'components/button';
import { Icon } from 'components/icon';
import { FileUpload } from 'components/file-upload';
import { CharTracker } from 'components/char-tracker';

function TweetBox() {
  const { user } = useCurrentUser();

  return (
    <div className="flex px-4 py-2">
      <div className="flex-shrink-0">
        <Avatar size="lg" src={user.avatar} alt={user.name} />
      </div>
      <div className="flex-1 ml-3">
        <TweetForm />
      </div>
    </div>
  );
}

function TweetForm() {
  const [body, setBody] = useCharTrackerState('', limit.TWEET_BODY_CHAR);
  const [image, setImage] = useState('');
  const [replyStatus] = useState('everyone');

  const textareaRef = useRef(null);
  const imageRef = useRef(null);

  const { eleHeight } = useCalHeight(body, 'auto', textareaRef);

  const [mutate, { isLoading }] = useMutation(createTweet, {
    onSuccess() {
      queryCache.refetchQueries('fetchAllTweets');
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await mutate({
      body,
      image,
      replyStatus,
    });
  }

  function handleImageAdd(e) {
    const imageFile = e.target.files[0];
    setImage(imageFile);

    const reader = new FileReader();
    reader.addEventListener('load', function (e) {
      imageRef.current.src = e.target.result;
    });

    reader.readAsDataURL(imageFile);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="tweet-main-textarea" className="sr-only">
        Create text
      </label>
      <textarea
        ref={textareaRef}
        id="tweet-main-textarea"
        placeholder="What's happening?"
        className="block w-full h-auto p-0 pt-2 text-lg border-none resize-none focus:shadow-none form-textarea"
        style={{ height: eleHeight }}
        value={body}
        onChange={setBody}
      />
      {image && (
        <div className="relative">
          <img
            ref={imageRef}
            className="object-cover w-full h-56 rounded-lg"
            src=""
            alt="Uploaded"
          />
          <div className="absolute top-0 left-0 p-2">
            <IconButton onClick={() => setImage('')} size="sm" color="primary">
              <Icon icon="x" className="w-5 h-5" />
            </IconButton>
          </div>
        </div>
      )}
      <hr className="my-2 border-gray-200" />
      <div className="flex items-center justify-between">
        <div className="flex items-center -ml-2">
          <FileUpload
            icon="photograph"
            size="md"
            color="white"
            name="image"
            onChange={handleImageAdd}
          />
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
            Tweet
          </Button>
        </div>
      </div>
    </form>
  );
}

export default TweetBox;
