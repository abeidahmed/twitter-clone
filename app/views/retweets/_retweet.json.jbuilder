json.partial! 'retweets/retweet_min', retweet: retweet

json.retweeter do
  json.partial! 'users/user', user: retweet.user
end

json.retweetable do
  if retweet.retweetable_type == 'Tweet'
    json.partial! 'tweets/tweet', tweet: retweet.retweetable

    json.twitter do
      json.partial! 'users/user', user: retweet.retweetable.user
    end
  elsif retweet.retweetable_type == 'Retweet'
    json.partial! 'retweets/retweet_min', retweet: retweet.retweetable

    json.nested_tweet do
      json.partial! 'retweets/retweet_min', retweet: retweet.retweetable.retweetable

      json.twitter do
        json.partial! 'users/user', user: retweet.retweetable.retweetable.user
      end
    end

    json.twitter do
      json.partial! 'users/user', user: retweet.retweetable.user
    end
  end
end