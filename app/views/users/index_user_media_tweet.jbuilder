json.tweets @tweets do |tweet|
  json.partial! 'tweets/tweet', tweet: tweet
end