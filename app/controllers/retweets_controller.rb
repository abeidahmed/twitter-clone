class RetweetsController < ApplicationController
  def index
    @retweets = Retweet.from_people_you_know(current_user)
  end

  def create
    @retweet = @retweetable.retweets.build(retweet_params)
    @retweet.user_id = current_user.id
    return error('bad_request') if current_user.already_retweeted?(@retweet.retweetable)

    if @retweet.save
      render :new, status: :created
    else
      render json: { message: @retweet.errors.full_messages }, status: :bad_request
    end
  end

  def vote
    retweet = Retweet.find(params[:id])
    if current_user.voted_up_on?(retweet)
      retweet.unliked_by(current_user)
    else
      retweet.liked_by(current_user)
    end
  end

  def destroy
    retweet = Retweet.find(params[:id])
    retweet.destroy
  end

  private
  def retweet_params
    params.require(:retweet).permit(:body)
  end
end
