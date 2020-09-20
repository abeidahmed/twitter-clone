require 'rails_helper'

RSpec.describe "Users", type: :request do
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

      it 'is expected to throw bad_request status' do
        expect(response).to have_http_status(:bad_request)
      end

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
        expect(user.keys).to match_array([:id, :twitter_handle, :token])
      end

      it 'is expected to return jwt token' do
        expect(json.dig(:user, :token)).to_not be_nil
      end

      it 'is expected to throw created status' do
        expect(response).to have_http_status(:created)
      end
    end
  end
end
