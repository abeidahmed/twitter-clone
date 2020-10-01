json.user do
  json.partial! 'user', user: @user
  json.partial! 'follow_count', user: @user
  json.partial! 'follow_stat', user: @user

  json.tweets @user.tweets do |tweet|
    json.partial! 'tweets/tweet', tweet: tweet
  end
end