class Retweet < ApplicationRecord
  include Helpers::DbHelper

  before_create { generate_token(:uuid, Retweet) }

  belongs_to :retweetable, polymorphic: true
  belongs_to :user
  has_many :retweets, as: :retweetable, dependent: :destroy

  validates_length_of :body, maximum: 240

  default_scope { order(created_at: :desc) }

  scope :own_retweets, ->(user) { where(user_id: user.id) }
  scope :from_people_you_follow, ->(user) { where(user_id: user.following.pluck(:id)) }
  scope :from_people_you_know, ->(user) { from_people_you_follow(user).or(own_retweets(user)) }
end
