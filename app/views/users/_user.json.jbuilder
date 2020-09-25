json.id user.id
json.twitter_handle user.twitter_handle
json.email user.email
json.name user.name
json.bio user.bio
json.location user.location
json.website user.website
json.avatar get_file_url(user.avatar, width: 200, height: 200, gravity: 'face', crop: 'thumb')
json.banner get_file_url(user.banner, height: 192)
json.created_at user.created_at
json.updated_at user.updated_at