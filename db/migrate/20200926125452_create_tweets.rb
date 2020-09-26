class CreateTweets < ActiveRecord::Migration[6.0]
  def change
    create_table :tweets do |t|
      t.text        :body,    null: false
      t.string      :image
      t.references  :user,    null: false, foreign_key: true

      t.timestamps
    end
  end
end
