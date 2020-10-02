json.tweets @tweets do |tweet|
  json.partial! 'tweets/tweet', tweet: tweet

  json.twitter do
    json.partial! 'users/user', user: tweet.user
  end

  json.comments tweet.comments do |comment|
    json.partial! 'comments/comment', comment: comment
  end
end