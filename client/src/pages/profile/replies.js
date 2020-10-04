import React from 'react';
import { useQuery } from 'react-query';
import { useSetTitle } from 'store/page-title';
import { allUserCommentedTweets } from 'api/all-tweets';
import * as q from 'shared/query-key';
import { TwitterCard } from 'components/twitter-card';
import { Spinner } from 'components/spinner';
import ObjectNotFound from 'shared/not-found/object-not-found';

function Replies({ user }) {
  useSetTitle(user.name, `@${user.twitterHandle}`);
  const { id } = user;

  const { data: { data: { tweets } = {} } = {}, isLoading, isError } = useQuery(
    [q.USER_COMMENTED_TWEETS, { id }],
    allUserCommentedTweets
  );

  return (
    <div className="relative">
      {isLoading || isError ? <Spinner /> : <DisplayReplies tweets={tweets} />}
    </div>
  );
}

function DisplayReplies({ tweets }) {
  return (
    <>
      {tweets.length ? (
        tweets.map((tweet) => (
          <TwitterCard key={tweet.id} tweet={tweet} showComments={true} />
        ))
      ) : (
        <ObjectNotFound description="The tweets that you have replied to will show up here." />
      )}
    </>
  );
}

export default Replies;
