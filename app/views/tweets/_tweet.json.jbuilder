json.id tweet.id
json.uuid tweet.uuid
json.body tweet.body
json.image get_file_url(tweet.image, height: 300, crop: 'fill')
json.reply_status tweet.reply_status
json.created_at tweet.created_at