class Comments::BookmarksController < BookmarksController
  before_action :set_bookmarkable, only: [:create]

  private
  def set_bookmarkable
    @bookmarkable = Comment.find(params[:comment_id])
  end
end