class Tweet < ApplicationRecord
  belongs_to :user

  validates_presence_of :body
  validates_length_of :body, maximum: 240
end
