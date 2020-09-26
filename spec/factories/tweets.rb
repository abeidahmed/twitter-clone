FactoryBot.define do
  factory :tweet do
    body { "MyText" }
    image { "MyString" }
    user { nil }
  end
end
