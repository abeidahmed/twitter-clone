require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe '#index' do
    let(:user) { create(:user) }

    context 'when the user is logged in' do
      before do
        get users_url, headers: auth_header(user)
      end

      it 'is expected to return all users' do
        users = json.dig(:users)
        user = users.first
        expect(user.keys).to match_array([
          :id,
          :twitterHandle,
          :email,
          :name,
          :location,
          :bio,
          :createdAt,
          :updatedAt
        ])
      end
    end

    context 'when the user is not logged in' do
      before do
        get users_url, headers: default_header
      end

      include_examples 'unauthorized'
    end
  end

  describe '#create' do
    let(:user) { build(:user) }

    let(:valid_user) { {
      user: {
        email: user.email,
        password: user.password,
        twitter_handle: user.twitter_handle
      }
    }.to_json }

    let(:invalid_user) { {
      user: {
        email: user.email,
        password: nil,
        twitter_handle: user.twitter_handle
      }
    }.to_json }

    context 'when the post request is invalid' do
      before do
        post users_url, params: invalid_user, headers: default_header
      end

      include_examples 'bad_request'

      it 'is expected to return an error message' do
        expect(json[:message]).to_not be_nil
      end
    end

    context 'when the post request is valid' do
      before do
        post users_url, params: valid_user, headers: default_header
      end

      it 'is expected to save the user' do
        expect(User.all.size).to eq(1)
      end

      it 'is expected to return user detail' do
        user = json[:user]
        expect(user.keys).to match_array([:id, :twitterHandle])
      end

      it 'is expected to return jwt token' do
        expect(json[:token]).to_not be_nil
      end

      include_examples 'created'
    end
  end

  describe '#show' do
    let(:user) { create(:user) }

    context 'when the user is signed in' do
      before do
        get user_url(user.twitter_handle), headers: auth_header(user)
      end

      include_examples 'user_json_return'
    end

    context 'when the user is not logged in' do
      before do
        get user_url(user.twitter_handle), headers: default_header
      end

      include_examples 'unauthorized'
    end
  end

  describe '#update' do
    let(:user) { create(:user) }

    let(:valid_user) { {
      user: {
        name: 'Abeid Ahmed',
        location: 'India',
        bio: 'Hello world'
      }
    }.to_json }

    context 'when the post request is valid and the user is logged in' do
      before do
        patch user_url(user.id), params: valid_user, headers: auth_header(user)
      end

      it 'is expected to update the user' do
        user.reload
        expect(user.name).to eq('Abeid Ahmed')
        expect(user.location).to eq('India')
        expect(user.bio).to eq('Hello world')
      end

      include_examples 'user_json_return'
    end

    context 'when the user is not logged in' do
      before do
        patch user_url(user.id), params: valid_user, headers: default_header
      end

      include_examples 'unauthorized'
    end
  end
end
