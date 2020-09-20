class Token
  SECRET_KEY = Rails.application.secrets.secret_key_base

  def initialize(**hash)
    @hash = hash
  end

  def encode
    JWT.encode @hash, SECRET_KEY, "HS256"
  end
end