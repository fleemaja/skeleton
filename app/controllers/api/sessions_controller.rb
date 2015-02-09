class Api::SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by_credentials(sessions_params[:username], sessions_params[:password])
    if @user
      sessions_params[:remember_user] ? signin_and_remember_user(@user) : sign_in(@user)
    else
      flash[:errors] = ["Invalid username or password."]
    end
    redirect_to :root


  end


  def destroy
    sign_out
    redirect_to :root
  end



  private

  def sessions_params
    params.require(:user).permit(:username, :password, :remember_user)
  end


end
