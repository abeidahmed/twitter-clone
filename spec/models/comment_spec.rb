require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'validations' do
    it { should validate_length_of(:content).is_at_most(240) }
  end

  describe 'associations' do
    it { should belong_to(:user) }

    it { should belong_to(:commentable) }

    it { should have_many(:comments) }

    it { should have_many(:bookmarks) }

    it { should have_many(:retweets) }
  end
end
