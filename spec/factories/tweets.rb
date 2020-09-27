FactoryBot.define do
  factory :tweet do
    association :user, factory: :user
    body { 'hello world' }
    image { Rails.root.join('spec', 'factories', 'test_image', 'image.jpg') }
    reply_status { 'everyone' }

    trait :people_you_know do
      reply_status { 'people_you_know' }
    end
  end
end
