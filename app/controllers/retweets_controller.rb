class RetweetsController < ApplicationController
  def index
    @retweets = Retweet.from_people_you_know(current_user).includes(:retweetable, :user)
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
    Vote.new(voter: current_user, object: retweet).toggle_like
  end

  def destroy
    retweet = Retweet.find_by(retweetable_id: params[:id])
    current_user.retweets.find(retweet.id).destroy
  end

  private
  def retweet_params
    params.require(:retweet).permit(:body)
  end
end
