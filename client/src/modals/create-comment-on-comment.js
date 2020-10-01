import React, { useRef } from 'react';
import { useCharTrackerState } from 'hooks/char-tracker';
import { useModalType } from 'store/modal';
import { useCalHeight } from 'hooks/calc-height';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { createCommentonComment } from 'api/create-comment';
import * as limit from 'shared/char-limit';
import * as q from 'shared/query-key';
import { timeNow } from 'utils/date-time';
import { TwitterTextarea } from 'components/twitter-textarea';
import { ModalWrapper } from 'components/modal-wrapper';
import { Avatar } from 'components/avatar';
import { TextButton } from 'components/button';

function CreateCommentOnComment() {
  const {
    modalProps: {
      commentID,
      commenterName,
      commenterTwitterHandle,
      commenterAvatar,
      commentBody,
      commentCreatedAt,
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
                src={commenterAvatar}
                alt={commenterTwitterHandle}
              />
            </div>
            <div className="flex-1 w-0.5 py-4 my-2 bg-gray-300"></div>
          </div>
          <div className="flex flex-col flex-1">
            <div>
              <div className="flex items-center">
                <TextButton
                  to={`/${commenterTwitterHandle}`}
                  color="black"
                  size="sm"
                  className="relative font-bold"
                >
                  {commenterName}
                </TextButton>
                <span className="pl-2 text-sm leading-5 text-gray-500">
                  @{commenterTwitterHandle}
                </span>
                <span className="mx-1">&middot;</span>
                <span className="text-sm leading-5 text-gray-500">
                  {timeNow(commentCreatedAt)}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-gray-600">{commentBody}</p>
            </div>
          </div>
        </section>
        <CommentBox rows={4} commentID={commentID} />
      </div>
    </ModalWrapper>
  );
}

function CommentBox({ commentID, rows }) {
  const [body, setBody, clearBody] = useCharTrackerState(
    '',
    limit.TWEET_BODY_CHAR
  );

  const textareaRef = useRef(null);
  const { eleHeight } = useCalHeight(body, 'auto', textareaRef);

  const { modalOff } = useModalType();
  const [mutate, { isLoading }] = useRefetchMutation(createCommentonComment, [
    q.SHOW_TWEET,
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
    await mutate({
      commentID,
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
      placeholder="Reply to this comment"
      buttonLabel="Reply"
    />
  );
}

export default CreateCommentOnComment;
