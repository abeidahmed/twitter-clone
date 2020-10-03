class Retweet < ApplicationRecord
  belongs_to :retweetable, polymorphic: true
  belongs_to :user
end
