require 'rails_helper'

RSpec.describe Token, type: :model do
  describe '#encode' do
    it 'is expected to encode the object from the hash' do
      expect(Token.new(user_id: 1).encode).to_not eq(1)
    end
  end
end