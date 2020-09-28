class Tweet < ApplicationRecord
  belongs_to :user

  validates_presence_of :body
  validates_length_of :body, maximum: 240

  enum reply_status: { everyone: 'everyone', people_you_know: 'people_you_know' }, _suffix: :can_reply

  default_scope -> { order(created_at: :desc) }

  scope :own_tweets, ->(user) { where(user_id: user.id) }
  scope :from_people_you_follow, ->(user) { where(user_id: user.following.pluck(:id)) }
  scope :from_people_you_know, ->(current_user) { from_people_you_follow(current_user).or(own_tweets(current_user)) }
end
