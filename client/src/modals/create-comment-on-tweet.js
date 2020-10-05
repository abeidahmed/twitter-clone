import React, { useRef } from 'react';
import { useCharTrackerState } from 'hooks/char-tracker';
import { useModalType } from 'store/modal';
import { useCalHeight } from 'hooks/calc-height';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { createCommentOnTweet } from 'api/create-comment';
import * as limit from 'shared/char-limit';
import * as q from 'shared/query-key';
import { timeNow } from 'utils/date-time';
import { TwitterTextarea } from 'components/twitter-textarea';
import { ModalWrapper } from 'components/modal-wrapper';
import { Avatar } from 'components/Avatar';
import { TextButton } from 'components/Button';

function CreateCommentOnTweet() {
  const {
    modalProps: {
      tweetID,
      twitterName,
      twitterTwitterHandle,
      twitterAvatar,
      tweetBody,
      tweetCreatedAt,
    },
  } = useModalType();

  return (
    <ModalWrapper modalPosition="top">
      <div className="px-4 py-2">
        <section className="flex space-x-3">
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0">
              <Avatar
                size="lg"
                src={twitterAvatar}
                alt={twitterTwitterHandle}
              />
            </div>
            <div className="flex-1 w-0.5 py-4 my-2 bg-gray-300"></div>
          </div>
          <div className="flex flex-col flex-1">
            <div>
              <div className="flex items-center">
                <TextButton
                  to={`/${twitterTwitterHandle}`}
                  appearance="black"
                  size="sm"
                  className="relative font-bold"
                >
                  {twitterName}
                </TextButton>
                <span className="pl-2 text-sm leading-5 text-gray-500">
                  @{twitterTwitterHandle}
                </span>
                <span className="mx-1">&middot;</span>
                <span className="text-sm leading-5 text-gray-500">
                  {timeNow(tweetCreatedAt)}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-gray-600">{tweetBody}</p>
            </div>
          </div>
        </section>
        <CommentBox rows={4} tweetID={tweetID} />
      </div>
    </ModalWrapper>
  );
}

function CommentBox({ tweetID, rows }) {
  const [body, setBody, clearBody] = useCharTrackerState(
    '',
    limit.TWEET_BODY_CHAR
  );

  const textareaRef = useRef(null);
  const { eleHeight } = useCalHeight(body, 'auto', textareaRef);

  const { modalOff } = useModalType();
  const [mutate, { isLoading }] = useRefetchMutation(createCommentOnTweet, [
    q.ALL_TWEETS,
    q.SHOW_TWEET,
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
    await mutate({
      tweetID,
      content: body,
    });
    clearBody();
    modalOff();
  }

  return (
    <TwitterTextarea
      rows={rows}
      canUploadImage={false}
      handleSubmit={handleSubmit}
      textareaRef={textareaRef}
      eleHeight={eleHeight}
      body={body}
      setBody={setBody}
      isLoading={isLoading}
      placeholder="Tweet your reply"
      buttonLabel="Reply"
    />
  );
}

export default CreateCommentOnTweet;
