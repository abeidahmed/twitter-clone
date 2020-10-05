class Retweets::BookmarksController < BookmarksController
  before_action :set_bookmarkable, only: [:create]

  private
  def set_bookmarkable
    @bookmarkable = Retweet.find(params[:retweet_id])
  end
end