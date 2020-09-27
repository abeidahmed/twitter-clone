json.id tweet.id
json.twitter do
  json.partial! 'tweet_user', tweet: tweet
end
json.body tweet.body
json.image tweet.image
json.reply_status tweet.reply_status
json.created_at format_date(tweet.created_at, type: 'short')