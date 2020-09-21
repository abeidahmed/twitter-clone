json.user do
  json.id @current_user.id
  json.email @current_user.email
  json.twitter_handle @current_user.twitter_handle
end

json.token @token