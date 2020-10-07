import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useSetTitle } from 'store/pageTitle';
import { useCurrentUser } from 'store/currentUser';
import { showTweet } from 'api/show-tweet';
import * as q from 'shared/queryKey';
import { detailedDate, time12format } from 'utils/dateTime';
import { Spinner } from 'components/Loader';
import { AspectRatio } from 'components/AspectRatio';
import { CardOption as TweetOption } from 'components/Card/TweetCard/components';
import TweetMeta from './TweetMeta';
import UserInfo from './UserInfo';
import { CommentCard } from 'components/Card';
import { TweetActionButtons } from 'components/ReactiveButton';

function ShowTweet() {
  useSetTitle('Tweet', null);

  const { currentUser } = useCurrentUser();

  const { uuid } = useParams();
  const { data: { data: { tweet } = {} } = {}, isLoading, isError } = useQuery(
    [q.SHOW_TWEET, { uuid }],
    showTweet
  );

  if (isLoading || isError) return <Spinner />;

  const { twitter, comments } = tweet;

  return (
    <div>
      <article className="py-3">
        <div className="px-4 border-b border-gray-200">
          <div className="flex justify-between">
            <UserInfo user={twitter} />
            {twitter.id === currentUser.id && (
              <div>
                <TweetOption tweetID={tweet.id} redirect={true} />
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
            <TweetMeta tweet={tweet} />
            <div className="flex items-center justify-between w-full max-w-lg py-1 mx-auto">
              <TweetActionButtons tweet={tweet} size="md" showCount={false} />
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

export default ShowTweet;
