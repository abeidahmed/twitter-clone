json.id comment.id
json.body comment.content
json.created_at comment.created_at
json.has_nested_comment !comment.comments.length.zero?

json.commenter do
  json.partial! 'users/user', user: comment.user
end

json.meta do
  json.is_bookmarked current_user.bookmarked?(comment)

  json.likes do
    json.total_likes comment.votes_for.size
    json.is_liked current_user.voted_up_on?(comment)
  end

  json.comments do
    json.total_comments comment.comments.size
  end
end

json.comments comment.comments do |comment|
  json.partial! 'comments/comment', comment: comment
end