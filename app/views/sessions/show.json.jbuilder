json.user do
  json.partial! 'users/user', user: @current_user
  json.partial! 'users/follow_count', user: @current_user
end

json.token @token