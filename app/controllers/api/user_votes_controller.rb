class Api::UserVotesController < ApplicationController

  before_action :extract_votable_type
  before_action :require_login

  def upvote
    render json: vote(1)
  end

  def downvote
     render json: vote(-1)
  end

  private

  def vote(direction)
    @user_vote = UserVote.find_by(votable_type: @votable_type, votable_id: @votable_id, user_id: current_user.id)

    if @user_vote
      val = @user_vote.value
      if val == direction
        @user_vote.update_attribute(:value, 0)
        return ( 0 - val )

      else
        @user_vote.update_attribute(:value, direction)
        return (direction - val)
      end

    else
      @user_vote = current_user.user_votes.create(value: direction, votable_type: @votable_type, votable_id: @votable_id)
      return direction
    end
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
