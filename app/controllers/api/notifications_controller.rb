class Api::NotificationsController < ApplicationController

  def show
    @notification = current_user.notifications.find(params[:id])
    @notification.update(is_read: true)
    render "show"
  end

  def update
    @notification = current_user.notifications.find(params[:id])
    @notification.update(is_read: true)
    render "show"
  end

  def index
    @notifications = current_user.notifications.reverse.take(5)
    render "index"
  end
end
