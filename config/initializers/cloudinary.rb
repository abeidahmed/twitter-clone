cloud = Rails.application.credentials.cloudinary

Cloudinary.config do |config|
  config.cloud_name = "#{cloud[:cloud_name]}"
  config.api_key = "#{cloud[:api_key]}"
  config.api_secret = "#{cloud[:api_secret]}"
  config.secure = true
  config.cdn_subdomain = true
end