json.tweets @tweets do |tweet|
  json.partial! 'tweets/tweet', tweet: tweet

  json.twitter do
    json.partial! 'user', user: tweet.user
  end
end