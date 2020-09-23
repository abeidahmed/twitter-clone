require 'rails_helper'

RSpec.describe "Relationships", type: :request do
  describe '#create' do
    let(:user) { create(:user) }
    let(:user1) { create(:user) }

    context 'when the post request is valid' do
      before do
        post relationships_url, params: { id: user1.id }.to_json, headers: auth_header(user)
      end

      it 'is expected to follow the user' do
        expect(user.following?(user1)).to be_truthy
      end
    end

    context 'when the follow request is made on oneself' do
      before do
        post relationships_url, params: { id: user.id }.to_json, headers: auth_header(user)
      end

      include_examples 'bad_request'
    end

    context 'when the post request is made by a guest' do
      before do
        post relationships_url, params: { id: user.id }.to_json, headers: default_header
      end

      include_examples 'unauthorized'
    end
  end

  describe '#destroy' do
    let(:user) { create(:user) }
    let(:user1) { create(:user) }

    context 'when the destroy request is valid' do
      before do
        user.follow(user1)
        delete relationship_url(user1), headers: auth_header(user)
      end

      it 'is expected to unfollow the user' do
        expect(user.following?(user1)).to be_falsy
      end
    end

    context 'when the destroy request is made on oneself' do
      before do
        user.follow(user1)
        delete relationship_url(user), headers: auth_header(user)
      end

      include_examples 'bad_request'
    end

    context 'when the destroy request is made by guest' do
      before do
        user.follow(user1)
        delete relationship_url(user1), headers: default_header
      end

      include_examples 'unauthorized'
    end
  end
end
