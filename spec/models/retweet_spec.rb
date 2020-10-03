require 'rails_helper'

RSpec.describe Retweet, type: :model do
  describe 'validations' do
    it { should validate_length_of(:body).is_at_most(240) }
  end

  describe 'associations' do
    it { should belong_to(:user) }

    it { should belong_to(:retweetable) }

    it { should have_many(:retweets) }
  end

  describe "before retweeting it should set uuid" do
    it "is expected to set uuid with Secure Random hash" do
      retweet = build :retweet, uuid: nil
      retweet.save!
      expect(retweet.reload.uuid).to_not be_nil
    end
  end
end
