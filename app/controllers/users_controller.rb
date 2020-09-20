class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      secret_key = Rails.application.secrets.secret_key_base
      data_to_encode = { user_id: "#{@user.id}" }
      @token = JWT.encode data_to_encode, secret_key, "HS256"
      render :new, status: :created
    else
      render json: { message: @user.errors }, status: :bad_request
    end
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
