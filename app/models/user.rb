class User < ApplicationRecord
  extend FriendlyId
  friendly_id :email, use: :slugged
end
