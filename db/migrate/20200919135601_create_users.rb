class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string  :email,           null: false
      t.string  :twitter_handle,  null: false
      t.string  :name
      t.text    :bio
      t.string  :location
      t.string  :website
      t.string  :password_digest
      t.string  :slug

      t.timestamps
    end
    add_index :users, :email
    add_index :users, :slug, unique: true
  end
end
