class Retweets::RetweetsController < RetweetsController
  before_action :set_retweetable, only: [:create]

  private
  def set_retweetable
    @retweetable = Retweet.find(params[:retweet_id])
  end
end