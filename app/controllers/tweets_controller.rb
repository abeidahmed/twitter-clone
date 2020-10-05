class TweetsController < ApplicationController
  def index
    @tweets = Tweet.from_people_you_know(current_user)
  end

  def show
    @tweet = Tweet.find_by(uuid: params[:id])
  end

  def create
    image = FileUpload.new(
      file: params[:image],
      file_location: nil,
      action: params[:action]
    ).upload_image!

    @tweet = current_user.tweets.create!(
      body: params[:body],
      image: image['url'],
      reply_status: params[:reply_status]
    )

    if @tweet
      render :new, status: :created
    else
      render json: { message: @tweet.errors.full_messages }, status: :bad_request
    end
  end

  def vote
    tweet = Tweet.find(params[:id])
    Vote.new(voter: current_user, object: tweet).toggle_like
  end

  def likers
    tweet = Tweet.find(params[:id])
    @likers = Vote.new(object: tweet).get_upvoters
    render :likers
  end

  def destroy
    tweet = Tweet.find(params[:id])
    return error('bad_request') unless current_user?(tweet.user)

    FileUpload.new(
      file: nil,
      file_location: tweet.image,
      action: params[:action]
    ).delete_image!

    tweet.destroy
    render json: { message: 'Deleted tweet!' }
  end
end
