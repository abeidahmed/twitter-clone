class Retweets::CommentsController < CommentsController
  before_action :set_commentable, only: [:create]

  private
  def set_commentable
    @commentable = Retweet.find(params[:retweet_id])
  end
end