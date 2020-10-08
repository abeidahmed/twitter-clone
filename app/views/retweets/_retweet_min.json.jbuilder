json.id retweet.id
json.body retweet.body
json.created_at retweet.created_at

json.meta do
  json.is_bookmarked false

  json.likes do
    json.total_likes retweet.votes_for.size
    json.is_liked current_user.voted_up_on?(retweet)
  end

  json.comments do
    json.total_comments retweet.comments.count
  end

  json.retweets do
    json.total_retweets retweet.retweets.count
    json.is_retweeted current_user.already_retweeted?(retweet)
  end
end