require 'rails_helper'

RSpec.describe Tweet, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:body) }

    it { should define_enum_for(:reply_status)
      .with_values(everyone: 'everyone', people_you_know: 'people_you_know')
      .backed_by_column_of_type(:string)
      .with_suffix(:can_reply)
    }

    it { should validate_length_of(:body).is_at_most(240) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
  end
end
