FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    sequence(:twitter_handle) { |n| "username#{n}" }
    sequence(:name) { |n| "name#{n}" }
    bio { 'lorem ipsum color de matur' }
    location { 'India' }
    website { 'https://localhost:3000' }
    password { 'mamakane' }
  end
end
