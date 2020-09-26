class CreateTweetAuths < ActiveRecord::Migration[6.0]
  def change
    create_table :tweet_auths do |t|
      t.references :tweet, null: false, foreign_key: true

      t.timestamps
    end
  end
end
