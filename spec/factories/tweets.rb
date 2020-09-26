FactoryBot.define do
  factory :tweet do
    body { 'hello world' }
    image { 'imageurl' }
    reply_status { 'everyone' }
    user factory: :user

    trait :people_you_know do
      reply_status { 'people_you_know' }
    end
  end
end
