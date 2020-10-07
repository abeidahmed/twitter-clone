import React from 'react';
import { useModalType } from 'store/modal';
import { timeNow } from 'utils/date-time';
import { ModalWrapper } from '../ModalWrapper';
import { Avatar } from 'components/Avatar';
import { TextButton } from 'components/Button';
import { CommentOnTweetBox } from 'components/TwitterBox';

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
        <CommentOnTweetBox rows={4} tweetID={tweetID} />
      </div>
    </ModalWrapper>
  );
}

export default CreateCommentOnTweet;
