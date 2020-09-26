class AddReplyStatusToTweets < ActiveRecord::Migration[6.0]
  def change
    add_column  :tweets, :reply_status, :string, null: false, default: 'everyone'
    add_index   :tweets, :reply_status
  end
end
