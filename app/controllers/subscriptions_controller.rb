class SubscriptionsController < ApplicationController
  
  def create
    @subscription = Subscription.new(subreddit_id: params[:subreddit_id], user_id: current_user.id)
    @subscription.save!
    flash[:errors] = @subscription.errors.full_messages
    redirect_to :back
  end
  
  def destroy
    @subscription = Subscription.find(params[:id])
    @subscription.destroy
    flash[:errors] = @subscription.errors.full_messages
    redirect_to :back
  end
    
end
