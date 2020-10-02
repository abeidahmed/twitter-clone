class BookmarksController < ApplicationController
  def index
    user = User.find_by(twitter_handle: params[:user_id])
    @bookmarks = user.bookmarks.all
  end

  def create
    return error('bad_request') if current_user.bookmarked?(@bookmarkable)
    @bookmark = @bookmarkable.bookmarks.build
    @bookmark.user_id = current_user.id
    render :new, status: :created if @bookmark.save
  end
end
