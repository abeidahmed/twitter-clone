class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      render json: { message: "Created user with email: #{user.email}" }, status: :created
    else
      render json: { message: user.errors }, status: :bad_request
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
