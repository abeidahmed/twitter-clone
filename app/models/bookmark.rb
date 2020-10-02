class Bookmark < ApplicationRecord
  belongs_to :bookmarkable, polymorphic: true
  belongs_to :user

  default_scope -> { order(created_at: :desc) }
end
