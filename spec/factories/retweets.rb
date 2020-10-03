FactoryBot.define do
  factory :retweet do
    user
    body { 'Retweetable tweet' }
    uuid { 'awgh3t3t3' }
    association :retweetable, factory: :tweet
  end
end
