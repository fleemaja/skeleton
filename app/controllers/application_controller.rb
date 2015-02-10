class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  def sign_in(user)
    @current_user = user
    cookies[:token] = user.reset_session_token!
  end

  def signin_and_remember_user(user)
    @current_user = user
    cookies.permanent[:token] = user.reset_session_token!
  end

  def current_user
    return nil unless cookies[:token]
    @current_user ||= User.find_by(session_token: cookies[:token] )
  end

  def signed_in?
    !!current_user
  end

  def sign_out
    if current_user
      current_user.reset_session_token!
    end

    cookies[:token] = nil
  end

  def require_login
    unless signed_in?
      flash[:errors] = ["You must be logged in to do that"]
      redirect_to :back
    end
  end
end
