class Tweet < ApplicationRecord
  belongs_to :user
  has_one :tweet_auth

  validates_presence_of :body
  validates_length_of :body, maximum: 240
end
