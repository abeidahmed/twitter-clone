json.retweets @retweets do |retweet|
  json.id retweet.id
  json.body retweet.body
  json.created_at retweet.created_at

  json.retweeter do
    json.partial! 'users/user', user: retweet.user
  end

  json.retweetable do
    if retweet.retweetable_type == 'Tweet'
      json.partial! 'tweets/tweet', tweet: retweet.retweetable
    end
  end
end