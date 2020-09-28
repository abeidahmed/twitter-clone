class AddUuidToTweet < ActiveRecord::Migration[6.0]
  def change
    add_column  :tweets, :uuid, :string
    add_index   :tweets, :uuid
  end
end
