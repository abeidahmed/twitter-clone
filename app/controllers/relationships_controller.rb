class RelationshipsController < ApplicationController
  def create
    user = User.find(params[:id])
    return error('bad_request') if current_user?(user)
    current_user.follow(user)
  end

  def destroy
    relationship = Relationship.find_by(followed_id: params[:id])
    return error('bad_request') if relationship.nil?
    user = relationship.followed
    current_user.unfollow(user)
  end
end
