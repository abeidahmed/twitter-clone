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

      include_examples 'bad_request'

      it 'is expected to return an error message' do
        expect(json[:message]).to match(/Invalid credentials/)
      end
    end

    context 'when the post request is valid' do
      before do
        post sessions_url, params: valid_user, headers: default_header
      end

      include_examples 'user_token_return'
    end
  end

  describe '#show' do
    let(:user) { create(:user) }

    context 'when the user is logged in' do
      before do
        get session_url('current_user'), headers: auth_header(user)
      end

      include_examples 'user_token_return'
    end

    context 'when the user is not logged in' do
      before do
        get session_url('current_user'), headers: default_header
      end

      include_examples 'unauthorized'
    end
  end
end
