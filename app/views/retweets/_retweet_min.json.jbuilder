json.id retweet.id
json.body retweet.body
json.created_at retweet.created_at

json.meta do
  json.is_bookmarked false

  json.likes do
    json.total_likes 10
    json.is_liked true
  end

  json.comments do
    json.total_comments 45
  end

  json.retweets do
    json.total_retweets retweet.retweets.count
    json.is_retweeted current_user.already_retweeted?(retweet)
  end
end