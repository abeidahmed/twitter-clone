class Tweets::BookmarksController < BookmarksController
  before_action :set_bookmarkable, only: [:create]

  private
  def set_bookmarkable
    @bookmarkable = Tweet.find(params[:tweet_id])
  end
end