import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useSetTitle } from 'store/pageTitle';
import { allBookmarks } from 'api/all-bookmarks';
import * as q from 'shared/queryKey';
import { TweetCard, CommentCard, RetweetCard } from 'components/Card';
import { Spinner } from 'components/Loader';

function Bookmark() {
  const { id } = useParams();
  useSetTitle('Bookmarks', `@${id}`);

  const {
    data: { data: { bookmarks } = {} } = {},
    isLoading,
    isError,
  } = useQuery([q.ALL_BOOKMARKS, { user_id: id }], allBookmarks);

  if (isLoading || isError) return <Spinner />;

  return (
    <main>
      {bookmarks.map((bookmark) => (
        <DisplayBookmark key={bookmark.id} bookmark={bookmark} />
      ))}
    </main>
  );
}

function DisplayBookmark({ bookmark }) {
  switch (bookmark.type) {
    case 'Tweet':
      return <TweetCard tweet={bookmark} />;
    case 'Retweet':
      return <RetweetCard tweet={bookmark} />;
    case 'Comment':
      return <CommentCard comment={bookmark} />;
    default:
      throw new Error(`Unhandled type: ${bookmark.type}`);
  }
}

export default Bookmark;
