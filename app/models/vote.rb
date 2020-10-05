class Vote
  def initialize(voter: nil, object: nil, **attr)
    @voter = voter
    @object = object
  end

  attr_reader :voter, :object

  def toggle_like
    if voter.voted_up_on?(object)
      object.unliked_by(voter)
    else
      object.liked_by(voter)
    end
  end

  def get_upvoters
    object.votes_for.up.voters
  end
end