json.user do
  json.partial! 'user', user: @user
  json.partial! 'follow_count', user: @user
end

json.token @token