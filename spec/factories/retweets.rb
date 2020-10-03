FactoryBot.define do
  factory :retweet do
    user
    body { 'Retweetable tweet' }
    uuid { 'awgh3t3t3' }
    for_tweet

    trait :for_tweet do
      association :retweetable, factory: :tweet
    end

    trait :for_comment do
      association :retweetable, factory: :comment
    end
  end
end
