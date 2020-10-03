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

  describe 'associations' do
    it { should have_many(:tweets) }

    it { should have_many(:comments) }

    it { should have_many(:bookmarks) }

    it { should have_many(:retweets) }
  end

  describe 'user profile validations' do
    it { should validate_length_of(:name).is_at_most(50) }

    it { should validate_length_of(:bio).is_at_most(160) }

    it { should validate_length_of(:location).is_at_most(30) }

    it { should validate_length_of(:website).is_at_most(100) }
  end

  describe '::find_by_credentials' do
    let(:user) { create(:user) }

    it 'is expected to return the user when user credentials are valid (downcase email)' do
      expect(described_class.find_by_credentials(user.email.upcase, user.password)).to eq(user)
    end

    it 'is expected to return nil when user credentials are invalid' do
      expect(described_class.find_by_credentials(user.email, 'helloworld')).to be_nil
    end

    it 'is expected to return nil when user is invalid' do
      expect(described_class.find_by_credentials('mamakane@example.com', 'helloworld')).to be_nil
    end
  end

  describe '#follow' do
    it 'is expected to successfully follow the user' do
      user1 = create(:user)
      user2 = create(:user)

      user1.follow(user2)
      expect(user1.following.size).to eq(1)
    end
  end

  describe '#unfollow' do
    it 'is expected to successfully unfollow the user' do
      user1 = create(:user)
      user2 = create(:user)

      user1.follow(user2)
      user1.unfollow(user2)
      expect(user1.following.size).to eq(0)
    end
  end

  describe '#following?' do
    it 'is expected to return a boolean value' do
      user1 = create(:user)
      user2 = create(:user)

      user1.follow(user2)
      expect(user1.following?(user2)).to be_truthy
    end
  end

  describe '#bookmarked?' do
    it 'is expected to return truthy if object is bookmarked' do
      user = create(:user)
      tweet = create(:tweet)
      tweet.bookmarks.create! user_id: user.id

      expect(user.bookmarked?(tweet)).to be_truthy
    end

    it 'is expected to return falsy if object is not bookmarked' do
      user = create(:user)
      tweet = create(:tweet)

      expect(user.bookmarked?(tweet)).to be_falsy
    end
  end

  describe '#already_retweeted?' do
    it 'is expected to return truthy if object is already retweeted' do
      user = create(:user)
      tweet = create(:tweet)
      retweet = tweet.retweets.create! user_id: user.id

      expect(user.already_retweeted?(retweet.retweetable)).to be_truthy
    end

    it 'is expected to return falsy if object is not already retweeted' do
      user = create(:user)
      user1 = create(:user)
      tweet = create(:tweet)
      retweet = tweet.retweets.create! user_id: user1.id

      expect(user.already_retweeted?(retweet.retweetable)).to be_falsy
    end
  end
end
