module Helpers::DbHelper
  def generate_token(column, klass)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while klass.exists?(column => self[column])
  end
end