RSpec.shared_examples "user_json_return" do
  it 'is expected to return user details' do
    expect(json[:user].keys).to match_array([
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