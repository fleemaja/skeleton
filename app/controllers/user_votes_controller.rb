class UserVotesController < ApplicationController
  before_action :extract_votable_type
  before_action :require_login

  def upvote
    vote(1)
  end

  def downvote
    vote(-1)
  end

  private

  def vote(direction)
    @user_vote = UserVote.find_by(votable_type: @votable_type, votable_id: @votable_id, user_id: current_user.id)

    if @user_vote
      if @user_vote.value == direction
        @user_vote.update_attribute(:value, 0)
      else
        @user_vote.update_attribute(:value, direction)
      end
    else
      @user_vote = current_user.user_votes.create(value: direction, votable_type: @votable_type, votable_id: @votable_id)
    end

    redirect_to :back
  end

  def extract_votable_type
    if params[:post_id]
      @votable_type = "Post"
      @votable_id = params[:post_id]
    elsif params[:comment_id]
      @votable_type = "Comment"
      @votable_id = params[:comment_id]
    else
      raise ActionController::ParameterMissing
    end
  end

  def require_login
    unless signed_in?
      flash[:errors] = ["You must be logged in to do that"]
      redirect_to :back
    end
  end
end
