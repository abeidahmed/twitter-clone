class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(email, password)

    if @user.nil?
      render json: { message: 'Invalid credentials' }, status: :bad_request
    else
      @token = Token.new(user_id: @user.id).encode
      render 'users/new'
    end
  end

  def show
    if current_user.nil?
      render json: { message: 'Please login to continue' }, status: :unauthorized
    else
      render :show
    end
  end

  private
    def email
      params.dig(:user, :email)
    end

    def password
      params.dig(:user, :password)
    end
end
