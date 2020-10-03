class Comments::RetweetsController < RetweetsController
  before_action :set_retweetable, only: [:create]

  private
  def set_retweetable
    @retweetable = Comment.find(params[:comment_id])
  end
end