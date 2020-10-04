import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useSetTitle } from 'store/page-title';
import { useCurrentUser } from 'store/current-user';
import { useModalType } from 'store/modal';
import { showTweet } from 'api/show-tweet';
import * as q from 'shared/query-key';
import { detailedDate, time12format } from 'utils/date-time';
import { Avatar } from 'components/avatar';
import { TextButton } from 'components/button';
import { Spinner } from 'components/spinner';
import { AspectRatio } from 'components/aspect-ratio';
import { TweetCardOption } from 'components/tweet-card-option';
import { TweetStats } from 'components/tweet-stats';
import { CommentCard } from 'components/comment-card';
import { TweetActionBtn } from 'components/tweet-action-btn';

function ShowTweet() {
  useSetTitle('Tweet', null);

  const { currentUser } = useCurrentUser();

  const { uuid } = useParams();
  const { data, isLoading, isError } = useQuery(
    [q.SHOW_TWEET, { uuid }],
    showTweet
  );

  if (isLoading || isError) return <Spinner />;

  const {
    tweet,
    tweet: {
      twitter,
      comments,
      meta: { likes },
    },
  } = data.data;

  return (
    <div>
      <article className="py-3">
        <div className="px-4 border-b border-gray-200">
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Avatar
                  size="lg"
                  src={twitter.avatar}
                  alt={twitter.twitterHandle}
                />
              </div>
              <div className="ml-3">
                <TextButton
                  to={`/${twitter.twitterHandle}`}
                  color="black"
                  size="sm"
                  className="relative font-bold"
                >
                  {twitter.name}
                </TextButton>
                <span className="block text-sm leading-5 text-gray-500">
                  @{twitter.twitterHandle}
                </span>
              </div>
            </div>
            {twitter.id === currentUser.id && (
              <div>
                <TweetCardOption tweetID={tweet.id} redirect={true} />
              </div>
            )}
          </div>
          <section className="mt-4">
            <p className="text-xl leading-8">{tweet.body}</p>
            {tweet.image && (
              <figure className="mt-3">
                <AspectRatio src={tweet.image} alt="Attachment" ratio="3:2" />
              </figure>
            )}
            <div className="flex items-center py-3 text-sm text-gray-500 border-b border-gray-200">
              <span>{time12format(tweet.createdAt)}</span>
              <span className="mx-1">&middot;</span>
              <span>{detailedDate(tweet.createdAt)}</span>
            </div>
            <TweetStatistics likes={likes} tweetID={tweet.id} />
            <div className="flex items-center justify-between w-full max-w-lg py-1 mx-auto">
              <TweetActionBtn tweet={tweet} size="md" showCount={false} />
            </div>
          </section>
        </div>
      </article>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          twitterID={twitter.id}
        />
      ))}
    </div>
  );
}

function TweetStatistics({ tweetID, likes }) {
  const { modalOn, types } = useModalType();

  function openLikesModal() {
    modalOn({
      modalType: types.LIKED_BY_LIST,
      modalProps: {
        id: tweetID,
      },
    });
  }

  return (
    <div className="flex items-center py-3 space-x-4 text-sm text-gray-500 border-b border-gray-200">
      <TweetStats count={32} title="Retweet" />
      <TweetStats count={4} title="Quote Tweet" />
      <TweetStats
        count={likes.totalLikes}
        title="Like"
        onClick={openLikesModal}
      />
    </div>
  );
}

export default ShowTweet;
