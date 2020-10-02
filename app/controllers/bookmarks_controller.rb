class BookmarksController < ApplicationController
  def index
    user = User.find(params[:user_id])
    @bookmarks = user.bookmarks.all
  end

  def create
    @bookmark = @bookmarkable.bookmarks.build
    @bookmark.user_id = current_user.id

    if @bookmark.save
      render :new, status: :created
    else
      render json: { message: @bookmark.errors.full_messages }, status: :bad_request
    end
  end
end
