RSpec.shared_examples "bad_request" do
  it 'is expected to throw bad_request status' do
    expect(response).to be_bad_request
  end
end

RSpec.shared_examples "created" do
  it 'is expected to throw created status' do
    expect(response).to be_created
  end
end