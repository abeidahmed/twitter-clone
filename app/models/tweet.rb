class Tweet < ApplicationRecord
  include Helpers::DbHelper

  acts_as_votable

  before_create { generate_token(:uuid, Tweet) }

  belongs_to :user
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :bookmarks, as: :bookmarkable, dependent: :destroy
  has_many :retweets, as: :retweetable, dependent: :destroy

  validates_presence_of :body
  validates_length_of :body, maximum: 240

  enum reply_status: { everyone: 'everyone', people_you_know: 'people_you_know' }, _suffix: :can_reply

  default_scope -> { order(created_at: :desc) }

  scope :own_tweets, ->(user) { where(user_id: user.id) }
  scope :from_people_you_follow, ->(user) { where(user_id: user.following.pluck(:id)) }
  scope :from_people_you_know, ->(current_user) { from_people_you_follow(current_user).or(own_tweets(current_user)) }
  scope :consist_images, -> { where.not(image: nil) }
  scope :with_comments_from, ->(user) { includes(:comments).where('comments.user_id': user.id) }
end
