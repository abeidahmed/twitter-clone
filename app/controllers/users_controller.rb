class UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]

  def index
    @users = User.all
  end

  def create
    @user = User.new(create_user_params)

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

    avatar = FileUpload.new(
      params[:avatar],
      file_location: @user.avatar
    ).upload_image!

    banner = FileUpload.new(
      params[:banner],
      file_location: @user.banner
    ).upload_image!

    if @user.update(
      name: params[:name],
      bio: params[:bio],
      location: params[:location],
      website: params[:website],
      avatar: avatar['url'] || params[:avatar],
      banner: banner['url'] || params[:banner]
    )
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
    def create_user_params
      params.require(:user).permit(
        :email,
        :twitter_handle,
        :password
      )
    end
end
