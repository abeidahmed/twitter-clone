class Retweet < ApplicationRecord
  belongs_to :retweetable, polymorphic: true
  belongs_to :user
  has_many :retweets, as: :retweetable

  validates_length_of :body, maximum: 240
end
