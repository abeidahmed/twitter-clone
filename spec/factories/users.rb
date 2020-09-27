FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    sequence(:twitter_handle) { |n| "username#{n}" }
    sequence(:name) { |n| "name#{n}" }
    bio { 'lorem ipsum color de matur' }
    location { 'India' }
    website { 'https://localhost:3000' }
    password { 'mamakane' }

    factory :user_with_tweets do
      transient do
        tweets_count { 1 }
      end

      after(:create) do |user, evaluator|
        create_list(:tweet, evaluator.tweets_count, user: user)
        user.reload
      end
    end
  end
end
