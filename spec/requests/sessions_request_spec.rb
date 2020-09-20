require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  describe '#post' do
    let(:user) { create(:user) }

    let(:valid_user) { {
      user: {
        email: user.email,
        password: user.password
      }
    }.to_json }

    let(:invalid_user) { {
      user: {
        email: user.email,
        password: 'helloworld'
      }
    }.to_json }

    context 'when the post request is invalid' do
      before do
        post sessions_url, params: invalid_user, headers: default_header
      end

      it 'is expected to throw bad_request status' do
        expect(response).to have_http_status(:bad_request)
      end

      it 'is expected to return an error message' do
        expect(json[:message]).to match(/Invalid credentials/)
      end
    end

    context 'when the post request is valid' do
      before do
        post sessions_url, params: valid_user, headers: default_header
      end

      it 'is expected to return user detail' do
        user = json[:user]
        expect(user.keys).to match_array([:id, :twitter_handle, :token])
      end

      it 'is expected to return jwt token' do
        expect(json.dig(:user, :token)).to_not be_nil
      end
    end
  end
end
