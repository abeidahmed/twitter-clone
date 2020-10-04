class CreateRetweets < ActiveRecord::Migration[6.0]
  def change
    create_table :retweets do |t|
      t.text        :body
      t.string      :uuid
      t.references  :retweetable,       polymorphic: true, null: false
      t.references  :user,              null: false, foreign_key: true

      t.timestamps
    end
    add_index :retweets, :uuid
  end
end
