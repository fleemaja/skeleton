class Api::SubscriptionsController < ApplicationController

  def create
    @subscription = Subscription.new(subreddit_id: params[:subreddit_id], user_id: current_user.id)
    @subscription.save!
    render json: @subscription
  end

  def destroy
    @subscription = Subscription.find(params[:id])
    @subscription.destroy
    render json: @subscription
  end

  def show
    render json: @subscription = Subscription.find(params[:id])
  end

  def index
    render json: @subscriptions = Subscription.all
  end
end
