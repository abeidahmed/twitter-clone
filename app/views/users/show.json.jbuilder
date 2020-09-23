json.user do
  json.partial! 'user', user: @user
  json.partial! 'follow_count', user: @user
  json.partial! 'follow_stat', user: @user
end