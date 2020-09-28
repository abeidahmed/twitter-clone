json.tweets @tweets do |tweet|
  json.partial! 'tweet', tweet: tweet
  json.twitter do
    json.partial! 'users/user', user: tweet.user
  end
end