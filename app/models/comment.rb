class Comment < ApplicationRecord
  acts_as_votable

  belongs_to :commentable, polymorphic: true
  belongs_to :user
  has_many :comments, as: :commentable, dependent: :destroy

  validates_length_of :content, maximum: 240
end
