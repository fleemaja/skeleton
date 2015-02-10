class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      params[:remember_user] ? signin_and_remember_user(@user) : sign_in(@user)
      redirect_to :root

    else
      flash.now[:errors] = @user.errors.full_messages
      redirect_to :root
    end
  end

  def update
    @user = User.find(params[:id])
    if (@user.update(user_params))
    end

    redirect_to :back
  end

  def show
    @user = User.find(params[:id])
    @posts = @user.posts
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end
end
