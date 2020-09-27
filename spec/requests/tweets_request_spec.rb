require 'rails_helper'

RSpec.describe "Tweets", type: :request do
  describe '#index' do
    let(:user) { create(:user) }

    context 'when the user is logged in' do
      before do
        create(:tweet)
        get tweets_url, headers: auth_header(user)
      end

      it 'is expected to list all the tweets' do
        expect(json[:tweets].length).to eq(1)
      end
    end

    context 'when the user is logged in' do
      before do
        get tweets_url, headers: default_header
      end

      include_examples 'unauthorized'
    end
  end

  describe '#create' do
    let(:user) { create(:user) }
    let(:tweet) { build(:tweet) }

    let(:tweet_req) {
      {
        body: tweet.body,
        image: tweet.image,
        reply_status: tweet.reply_status
      }.to_json
    }
    context 'when the user is logged in' do
      before do
        post tweets_url, params: tweet_req, headers: auth_header(user)
      end

      it 'is expected to create a tweet' do
        expect(Tweet.all.size).to eq(1)
      end

      it 'is expected to return a json response' do
        expect(json[:tweet]).to_not be_nil
      end

      include_examples 'created'
    end

    context 'when the user is a guest' do
      before do
        post tweets_url, params: tweet_req, headers: default_header
      end

      include_examples 'unauthorized'
    end
  end

  describe '#destroy' do
    let(:user) { create(:user) }
    let(:tweet) { create(:tweet) }

    context 'when the user is logged in' do
      before do
        delete tweet_url(tweet), headers: auth_header(user)
      end

      it 'is expected to delete the tweet' do
        expect(Tweet.all.size).to be_zero
      end
    end

    context 'when the user is a guest' do
      before do
        delete tweet_url(tweet), headers: default_header
      end

      include_examples 'unauthorized'
    end
  end
end
