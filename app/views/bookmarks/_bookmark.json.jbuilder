json.type bookmark.bookmarkable_type

if bookmark.bookmarkable_type == 'Tweet'
  json.partial! 'tweets/tweet', tweet: bookmark.bookmarkable

  json.twitter do
    json.partial! 'users/user', user: bookmark.bookmarkable.user
  end
else
  json.partial! 'comments/comment', comment: bookmark.bookmarkable
  # Bookmarks should not have nested comments and should only display if bookmarked explicitly
  json.has_nested_comment false
  json.comments []
end