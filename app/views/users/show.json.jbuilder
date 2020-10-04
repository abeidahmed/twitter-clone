json.user do
  json.partial! 'user', user: @user

  json.tweets @user.tweets do |tweet|
    json.partial! 'tweets/tweet', tweet: tweet
  end
end