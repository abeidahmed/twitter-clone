import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useSetTitle } from 'store/page-title';
import { allBookmarks } from 'api/all-bookmarks';
import * as q from 'shared/query-key';
import { TwitterCard } from 'components/twitter-card';
import { CommentCard } from 'components/comment-card';
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
          <TwitterCard key={bookmark.id} tweet={bookmark} />
        ) : (
          <CommentCard key={bookmark.id} comment={bookmark} />
        )
      )}
    </main>
  );
}

export default Bookmark;
