class Tweets::RetweetsController < RetweetsController
  before_action :set_retweetbale, only: [:create]

  private
  def set_retweetbale
    @retweetable = Tweet.find(params[:tweet_id])
  end
end