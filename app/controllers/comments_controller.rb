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

  def vote
    comment = Comment.find(params[:id])
    Vote.new(voter: current_user, object: comment).toggle_like
  end

  def destroy
    comment = Comment.find(params[:id])
    return error('unauthorized') unless deletable?(comment)
    comment.destroy
  end

  private
  def comment_params
    params.require(:comment).permit(:content)
  end

  def deletable?(comment)
    current_user?(comment.user) || current_user?(comment.commentable.user)
  end
end
