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

    if current_user.voted_up_on?(comment)
      comment.unliked_by(current_user)
    else
      comment.liked_by(current_user)
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    return error('unauthorized') unless deleteable?(comment)
    comment.destroy
  end

  private
  def comment_params
    params.require(:comment).permit(:content)
  end

  def deleteable?(comment)
    current_user?(comment.user) || current_user?(comment.commentable.user)
  end
end
