require 'rails_helper'

RSpec.describe "Comments", type: :request do
  describe '#create' do
    describe 'comment on tweet' do
      let(:user) { create(:user) }
      let(:tweet) { create(:tweet) }
      let(:comment) { build(:comment) }

      let(:valid_comment) { { content: comment.content, tweet_id: tweet.id }.to_json }

      context 'when the comment on tweet request is valid' do
        before do
          post tweet_comments_url(tweet), params: valid_comment, headers: auth_header(user)
        end

        it 'is expected to create a comment' do
          expect(Comment.all.size).to eq(1)
        end

        include_examples 'created'
      end

      context 'when the comment on tweet request is made by guest' do
        before do
          post tweet_comments_url(tweet), params: valid_comment, headers: default_header
        end

        include_examples 'unauthorized'
      end
    end

    describe 'comment on comment' do
      let(:user) { create(:user) }
      let(:tweet) { create(:tweet) }
      let(:comment) { build(:comment) }

      let(:valid_comment) { { content: comment.content, tweet_id: tweet.id }.to_json }

      context 'when the comment on comment request is valid' do
        before do
          comment1 = create(:comment)
          post comment_comments_url(comment1), params: valid_comment, headers: auth_header(user)
        end

        it 'is expected to create a comment' do
          expect(Comment.all.size).to eq(2)
        end

        include_examples 'created'
      end

      context 'when the comment on comment is made by a guest' do
        before do
          comment1 = create(:comment)
          post comment_comments_url(comment1), params: valid_comment, headers: default_header
        end

        include_examples 'unauthorized'
      end
    end
  end
end
