require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  describe 'email validations' do
    it { should validate_presence_of(:email)}

    it { should validate_uniqueness_of(:email).case_insensitive }

    it { should_not allow_value('abeidmama', 'abeidm@em@.com').for(:email) }

    it { should allow_value('abeidmama@example.com', 'abeidm@em.uk.com').for(:email) }

    it { should validate_length_of(:email).is_at_most(255) }

    it 'is expected to lowercase email before saving' do
      user = build(:user)
      user.email = user.email.upcase
      user.save!
      expect(user.reload.email).to eq(user.email.downcase)
    end
  end

  describe 'password validations' do
    it { should have_secure_password }

    it { should validate_length_of(:password).is_at_least(5) }
  end

  describe 'twitter handle validations' do
    it { should validate_presence_of(:twitter_handle) }

    it { should validate_uniqueness_of(:twitter_handle).case_insensitive }

    it { should validate_length_of(:twitter_handle).is_at_most(30) }

    it { should_not allow_value('abeid.', 'abeid_ahmed!').for(:twitter_handle) }

    it { should allow_value(
      'abeid',
      'abeid_ahmed',
      'abeid_ahmed123',
      'Abeid_ahmed12',
      'Abeid_Ahmed_12'
    ).for(:twitter_handle) }

    it 'is expected to lowercase twitter handle before saving' do
      user = build(:user)
      user.twitter_handle = user.twitter_handle.upcase
      user.save!
      expect(user.reload.twitter_handle).to eq(user.twitter_handle.downcase)
    end
  end

  describe 'user profile validations' do
    it { should validate_length_of(:name).is_at_most(50) }

    it { should validate_length_of(:bio).is_at_most(160) }

    it { should validate_length_of(:location).is_at_most(30) }

    it { should validate_length_of(:website).is_at_most(100) }
  end
end
