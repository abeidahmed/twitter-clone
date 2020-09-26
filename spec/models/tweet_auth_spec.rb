require 'rails_helper'

RSpec.describe TweetAuth, type: :model do
  describe 'associations' do
    it { should belong_to(:tweet) }
  end
end
