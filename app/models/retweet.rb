class Retweet < ApplicationRecord
  include Helpers::DbHelper

  before_create { generate_token(:uuid, Retweet) }

  belongs_to :retweetable, polymorphic: true
  belongs_to :user
  has_many :retweets, as: :retweetable, dependent: :destroy

  validates_length_of :body, maximum: 240

  default_scope { order(created_at: :desc) }
end
