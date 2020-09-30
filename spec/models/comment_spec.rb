require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }

    it { should belong_to(:commentable) }

    it { should have_many(:comments) }
  end
end
