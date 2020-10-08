json.id tweet.id
json.uuid tweet.uuid
json.body tweet.body
json.image get_file_url(tweet.image, height: 300, crop: 'fill')
json.reply_status tweet.reply_status
json.created_at tweet.created_at

json.meta do
  json.is_bookmarked current_user.bookmarked?(tweet)

  json.likes do
    json.total_likes tweet.votes_for.size
    json.is_liked current_user.voted_up_on?(tweet)
  end

  json.comments do
    json.total_comments tweet.comments.size
  end

  json.retweets do
    json.total_retweets tweet.retweets.count
    json.is_retweeted current_user.already_retweeted?(tweet)
  end
end