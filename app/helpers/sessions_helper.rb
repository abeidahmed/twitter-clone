module SessionsHelper
  def current_user
    header = request.headers['Authorization']
    unless header.blank?
      @token = header.sub('Bearer ', '')
      id = Token.new(token: @token).decode.first['user_id']
      @current_user ||= User.find(id)
    end
  end
end