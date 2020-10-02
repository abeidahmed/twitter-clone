json.bookmarks @bookmarks do |bookmark|
  json.partial! 'bookmark', bookmark: bookmark
end