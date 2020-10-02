FactoryBot.define do
  factory :bookmark do
    user

    trait :for_tweet do
      association :bookmarkable, factory: :tweet
    end

    trait :for_comment do
      association :bookmarkable, factory: :comment
    end
  end
end
