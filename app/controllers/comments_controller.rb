class CommentsController < ApplicationController
  def create
    @comment = @commentable.comments.build(comment_params)
    @comment.user_id = current_user.id

    if @comment.save
      render :new, status: :created
    else
      render json: { message: @comment.errors.full_messages }, status: :bad_request
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:content)
  end
end
