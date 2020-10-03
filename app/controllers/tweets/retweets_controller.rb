class Tweets::RetweetsController < RetweetsController
  before_action :set_retweetable, only: [:create]

  private
  def set_retweetable
    @retweetable = Tweet.find(params[:tweet_id])
  end
end