class User < ApplicationRecord
  has_secure_password

  before_save do
    email.downcase!
    twitter_handle.downcase!
  end

  has_many :active_relationships,
    class_name: 'Relationship',
    foreign_key: 'follower_id',
    dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed

  has_many :passive_relationships,
    class_name: 'Relationship',
    foreign_key: 'followed_id',
    dependent: :destroy
  has_many :followers, through: :passive_relationships, source: :follower

  has_one_attached :avatar
  has_one_attached :banner

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

  def follow(other_user)
    active_relationships.create!(followed_id: other_user.id)
  end

  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  def following?(other_user)
    following.include?(other_user)
  end
end
