require 'rails_helper'

RSpec.describe Relationship, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:follower_id) }

    it { should validate_presence_of(:followed_id) }
  end
end
