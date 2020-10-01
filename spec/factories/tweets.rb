FactoryBot.define do
  factory :tweet do
    association :user, factory: :user
    body { 'hello world' }
    image { Rails.root.join('spec', 'factories', 'test_image', 'image.jpg') }
    reply_status { 'everyone' }
    uuid { 'lashiw135135' }

    trait :people_you_know do
      reply_status { 'people_you_know' }
    end

    factory :tweet_with_comments do
      transient do
        comments_count { 1 }
      end

      after(:create) do |tweet, evaluator|
        create_list(:comment, evaluator.comments_count, tweet: tweet)
        tweet.reload
      end
    end
  end
end
