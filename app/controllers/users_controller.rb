class UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]

  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)

    if @user.save
      @token = Token.new(user_id: @user.id).encode
      render :new, status: :created
    else
      render json: { message: @user.errors.full_messages }, status: :bad_request
    end
  end

  def show
    @user = User.find_by(twitter_handle: params[:id])
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render :edit
    else
      render json: { message: @user.errors.full_messages }, status: :bad_request
    end
  end

  def following
    user = User.find_by(twitter_handle: params[:id])
    @users = user.following.all
    render :show_follow
  end

  def followers
    user = User.find_by(twitter_handle: params[:id])
    @users = user.followers.all
    render :show_follow
  end

  private
    def user_params
      params.require(:user).permit(
        :email,
        :twitter_handle,
        :name,
        :bio,
        :location,
        :website,
        :password
      )
    end
end
