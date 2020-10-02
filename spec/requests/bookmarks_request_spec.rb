require 'rails_helper'

RSpec.describe "Bookmarks", type: :request do
  describe '#index' do
    context 'when the request is made by a logged in user' do
      before do
        user = create(:user)
        tweet = create(:tweet)
        tweet.bookmarks.create! user_id: user.id
        get user_bookmarks_url(user.twitter_handle), headers: auth_header(user)
      end

      it 'is expected to list all the bookmarks' do
        expect(json[:bookmarks].size).to eq(1)
      end
    end
  end

  describe '#create' do
    let(:user) { create(:user) }

    context 'when the tweet is bookmarked' do
      before do
        tweet = create(:tweet)
        post tweet_bookmarks_url(tweet), params: nil, headers: auth_header(user)
      end

      it 'is expected to save the bookmark' do
        expect(Bookmark.all.size).to eq(1)
      end
    end

    context 'when the comment is bookmarked' do
      before do
        comment = create(:comment)
        post comment_bookmarks_url(comment), params: nil, headers: auth_header(user)
      end

      it 'is expected to save the bookmark' do
        expect(Bookmark.all.size).to eq(1)
      end
    end
  end
end
