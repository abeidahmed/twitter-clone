json.user do
  json.partial! 'users/user', user: @user
  json.partial! 'users/follow_count', user: @user
end

json.token @token