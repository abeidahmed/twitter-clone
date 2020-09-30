FactoryBot.define do
  factory :comment do
    user
    content { "hello world, all the comments" }
    association :commentable, factory: :tweet
  end
end
