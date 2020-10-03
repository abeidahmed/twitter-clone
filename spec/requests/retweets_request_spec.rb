require 'rails_helper'

RSpec.describe "Retweets", type: :request do
  describe '#create' do
    let(:user) { create(:user) }
    let(:retweet) { { retweet: { body: 'hello world' } }.to_json }

    context 'when the tweet is retweeted by a logged in user' do
      before do
        tweet = create(:tweet)
        post tweet_retweets_url(tweet), params: retweet, headers: auth_header(user)
      end

      it 'is expected to retweet' do
        expect(Retweet.first.body).to eq('hello world')
      end

      include_examples 'created'
    end

    context 'when the comment is retweeted by a logged in user' do
      before do
        comment = create(:comment)
        post comment_retweets_url(comment), params: retweet, headers: auth_header(user)
      end

      it 'is expected to retweet' do
        expect(Retweet.first.body).to eq('hello world')
      end

      include_examples 'created'
    end
  end
end
