require 'rails_helper'

RSpec.describe "Tweets", type: :request do
  describe '#index' do
    let(:user) { create(:user) }

    context 'when the user is logged in' do
      before do
        create(:tweet)
        get tweets_url, headers: auth_header(user)
      end

      xit 'is expected to list all the tweets' do
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

  describe '#show' do
    let(:user) { create(:user) }
    let(:tweet) { create(:tweet) }

    context 'when the user is logged in' do
      before do
        get tweet_url(tweet.uuid), headers: auth_header(user)
      end

      it 'is expected to show the tweet' do
        expect(json[:tweet]).to_not be_nil
      end
    end
  end

  describe '#destroy' do
    context 'when the user is logged in' do
      before do
        user = create(:user_with_tweets, tweets_count: 2)
        delete tweet_url(user.tweets.first), headers: auth_header(user)
      end

      it 'is expected to delete the tweet' do
        expect(Tweet.all.size).to eq(1)
      end
    end

    context 'when the request is not made by the author of the tweet' do
      before do
        user = create(:user)
        tweet = create(:tweet)
        delete tweet_url(tweet), headers: auth_header(user)
      end

      it 'is expected to not delete the tweet' do
        expect(Tweet.all.size).to eq(1)
      end

      include_examples 'bad_request'
    end

    context 'when the user is a guest' do
      before do
        tweet = create(:tweet)
        delete tweet_url(tweet), headers: default_header
      end

      include_examples 'unauthorized'
    end
  end
end
