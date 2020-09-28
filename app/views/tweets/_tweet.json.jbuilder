json.id tweet.id
json.body tweet.body
json.image get_file_url(tweet.image, height: 300, crop: 'fill')
json.reply_status tweet.reply_status
json.created_at format_date(tweet.created_at, type: 'short')