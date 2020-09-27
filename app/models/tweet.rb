class Tweet < ApplicationRecord
  belongs_to :user

  validates_presence_of :body
  validates_length_of :body, maximum: 240

  scope :date_sort, -> { order(created_at: :desc) }

  enum reply_status: { everyone: 'everyone', people_you_know: 'people_you_know' }, _suffix: :can_reply
end
