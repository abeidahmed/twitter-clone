require 'rails_helper'

RSpec.describe Bookmark, type: :model do
  describe 'validations' do
    it { should belong_to(:user) }

    it { should belong_to(:bookmarkable) }
  end
end
