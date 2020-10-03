FactoryBot.define do
  factory :retweet do
    retweetable { nil }
    body { "MyText" }
    user { nil }
  end
end
