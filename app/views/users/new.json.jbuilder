json.user do
  json.id @user.id
  json.twitter_handle @user.twitter_handle
  json.name @user.name
end

json.token @token