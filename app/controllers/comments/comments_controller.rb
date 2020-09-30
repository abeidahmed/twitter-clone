class Comments::CommentsController < CommentsController
  before_action :set_commentable, only: [:create]

  private
  def set_commentable
    @commentable = Comment.find(params[:comment_id])
  end
end