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

    describe 'comment on retweet' do
      let(:user) { create(:user) }
      let(:retweet) { create(:retweet) }
      let(:comment) { build(:comment) }

      let(:valid_comment) { { content: comment.content, retweet_id: retweet.id }.to_json }

      context 'when the comment on retweet request is valid' do
        before do
          post retweet_comments_url(retweet), params: valid_comment, headers: auth_header(user)
        end

        it 'is expected to create a comment' do
          expect(Comment.all.size).to eq(1)
        end

        include_examples 'created'
      end

      context 'when the comment on retweet request is made by guest' do
        before do
          post retweet_comments_url(retweet), params: valid_comment, headers: default_header
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

  describe '#vote' do
    let(:user) { create(:user) }
    let(:comment) { create(:comment) }

    context 'when the user has liked the comment' do
      before do
        user.likes(comment)
        post vote_comment_url(comment.id), headers: auth_header(user)
      end

      it 'is expected to unlike the comment' do
        expect(comment.get_upvotes.size).to be_zero
      end
    end

    context 'when the user has not liked the comment' do
      before do
        post vote_comment_url(comment.id), headers: auth_header(user)
      end

      it 'is expected to like the comment' do
        expect(comment.get_upvotes.size).to eq(1)
      end
    end

    context 'when the user has disliked the comment' do
      before do
        user.dislikes(comment)
        post vote_comment_url(comment.id), headers: auth_header(user)
      end

      it 'is expected to like the comment' do
        expect(comment.get_upvotes.size).to eq(1)
      end
    end
  end

  describe '#destroy' do
    context 'when the request is made by the commenter' do
      before do
        user = create(:user)
        comment = create(:comment, user: user)
        delete comment_url(comment), headers: auth_header(user)
      end

      it 'is expected to delete the comment' do
        expect(Comment.all.size).to be_zero
      end
    end

    context 'when the request is made by tweet owner' do
      before do
        user = create(:user)
        tweet = create(:tweet_with_comments)
        delete comment_url(tweet.comments.first), headers: auth_header(user)
      end

      xit 'is expected to delete the comment' do
        expect(Comment.all.size).to be_zero
      end
    end

    context 'when the request is made a non-commenter' do
      before do
        user = create(:user)
        user1 = create(:random_user)
        comment = create(:comment, user: user)
        delete comment_url(comment), headers: auth_header(user1)
      end

      include_examples 'unauthorized'
    end
  end
end
