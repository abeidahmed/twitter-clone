json.id comment.id
json.body comment.content
json.created_at comment.created_at
json.has_nested_comment !comment.comments.length.zero?

json.commenter do
  json.partial! 'users/user', user: comment.user
end

json.meta do
  json.likes do
    json.total_likes 14
    json.is_liked true
  end
  json.comments do
    json.total_comments comment.comments.size
  end
end

json.comments comment.comments do |comment|
  json.partial! 'comments/comment', comment: comment
end