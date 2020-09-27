json.tweets @tweets do |tweet|
  json.partial! 'tweet', tweet: tweet
end