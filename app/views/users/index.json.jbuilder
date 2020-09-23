json.users @users do |user|
  json.partial! 'user', user: user
  json.partial! 'follow_stat', user: user
end