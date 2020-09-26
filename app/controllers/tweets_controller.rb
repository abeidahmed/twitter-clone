class TweetsController < ApplicationController
  def create
    image = FileUpload.new(
      file: params[:image],
      file_location: nil,
      action: params[:action]
    ).upload_image!

    @tweet = current_user.tweets.create!(body: params[:body], image: image['url'])

    if @tweet
      render :new, status: :created
    else
      render json: { message: @tweet.errors.full_messages }, status: :bad_request
    end
  end

  def destroy
    tweet = Tweet.find(params[:id])
    FileUpload.new(
      file: nil,
      file_location: tweet.image,
      action: params[:action]
    ).delete_image!

    tweet.destroy
    render json: { message: 'Deleted tweet!' }
  end
end
