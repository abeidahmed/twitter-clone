class User < ApplicationRecord
  extend FriendlyId
  friendly_id :email, use: :slugged

  has_secure_password

  before_save do
    email.downcase!
    twitter_handle.downcase!
  end

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  VALID_TWITTER_HANDLE_REGEX = /\A[a-z0-9_]+\z/i

  validates_presence_of :email
  validates_uniqueness_of :email, case_sensitive: false
  validates_length_of :email, maximum: 255
  validates_format_of :email, with: VALID_EMAIL_REGEX

  validates_length_of :password, minimum: 5, allow_blank: true

  validates_presence_of :twitter_handle
  validates_uniqueness_of :twitter_handle, case_sensitive: false
  validates_length_of :twitter_handle, maximum: 30
  validates_format_of :twitter_handle, with: VALID_TWITTER_HANDLE_REGEX

  validates_length_of :name, maximum: 50
  validates_length_of :bio, maximum: 160
  validates_length_of :location, maximum: 30
  validates_length_of :website, maximum: 100

  def self.find_by_credentials(email, password)
    user = self.find_by(email: email.downcase)
    return nil unless user
    user.authenticate(password) ? user : nil
  end
end
