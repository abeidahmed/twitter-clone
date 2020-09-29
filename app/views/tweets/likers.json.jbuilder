json.users @likers do |user|
  json.partial! 'users/user', user: user
  json.partial! 'users/follow_stat', user: user
end