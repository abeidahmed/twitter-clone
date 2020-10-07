import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useSetTitle } from 'store/pageTitle';
import { allBookmarks } from 'api/all-bookmarks';
import * as q from 'shared/query-key';
import { TweetCard } from 'components/Card';
import { CommentCard } from 'components/Card';
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
      {bookmarks.map((bookmark) =>
        bookmark.type === 'Tweet' ? (
          <TweetCard key={bookmark.id} tweet={bookmark} />
        ) : (
          <CommentCard key={bookmark.id} comment={bookmark} />
        )
      )}
    </main>
  );
}

export default Bookmark;
